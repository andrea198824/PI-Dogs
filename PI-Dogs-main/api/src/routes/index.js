const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}')
    const apiInfo = await apiUrl.data.map(c => {
        return {
            id: c.id,
            name: c.name,
            image: c.image.url,
            height: c.height.metric,
            weight: c.weight.metric,
        };
    });
    return apiInfo;
};
console.log(getApiInfo)

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get("/dogs", function (req, res) {
    axios.get("https://api.thedogapi.com/v1/breeds")
        .then(resp => {
            res.send(resp.data)
        })
        .catch(error => {
            console.log(error)
        })
})


router.get('/searching_dogs', async (req, res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogName = await dogsTotal.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ? res.status(200).send(dogName) : res.status(400).send('No existe la raza');
    } else {
        res.status(200).send(dogsTotal)
    }
})
router.get('/temperaments', async (req, res) => {
    const temperApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}')
    const temperaments = temperApi.data.map((c) => c.temperament)
    const tempEach = temperaments.join().split(",")
    const arrayFiltrado = [...new Set(tempEach)];
    //const arrayFiltrado = tempEach.filter((el, pos)=> tempEach.indexOf(el) === pos)

    console.log(arrayFiltrado)
    arrayFiltrado.forEach(c => {
        Temperament.findOrCreate({
            where: { name: c }
        })
    })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
})
router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id;

    try {
        let dogsTotal = await getAllDogs.findByPk(id, {
            include: [
                {
                    model: Dog,
                    attribute: ["name", "weight", "height", "age"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        res.status(200).send(dogsTotal);
    } catch (error) {
        res.json({ error: "id no válido" });
    }
});
// router.get('/dogs/:id', async(req,res) =>{
//     const id = req.params.id;

//     const dogsTotal = await getAllDogs()
//     if(id){
//         let dogId = dogsTotal.filter(c => c.id == id)
//         console.log(dogId)
//         dogId.length? 
//         res.status(200).json(dogId) : 
//         res.status(404).send('No existe esa raza')
//     }

// })


router.post('/dog', async (req, res, next) => {
    let { name,  height, weight, temperament, createdInDb } = req.body
    try {
        const [newDogs, dogCreated] = await Dog.create({
            where: {
                name,
                height,
                weight,
                createdInDb
            },
        });
        console.log(dogCreated)
        if (temperament) {
            let temperamentDb = await Temperament.findAll({ where: { name: temperament } })
            await newDogs.addTemperament(temperamentDb);
        }

        res
            .status(200)
            .send(`La raza ${name} ha sido creada`);
    } catch (error) {
        next(error);
    }

    //dogCreated.addTemperament(temperamentDb)
    //res.send('Perrito creado :)')
});

router.put("/dogs/:id", async (req, res, next) => {
    const id = req.params.id;
    const temperamento = req.body; //lo q me pasan por body de las propiedades activities
    try {
        let act = await Dog.update(temperamento, {
            where: {
                id: id,
            },
        });
        return res.json({ modificado: true });
    } catch (error) {
        next(error);
    }

    router.delete("/dogs/:id", async (req, res, next) => {
        const id = req.params.id;
        try {
            let act = await Dog.destroy({
                where: {
                    id: id,
                },
            });
            return res.json({ eliminado: true });
        } catch (error) {
            next(error);
        }
    });
});




module.exports = router;