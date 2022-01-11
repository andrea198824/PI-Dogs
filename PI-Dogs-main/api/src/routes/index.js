const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament} = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}')
    const apiInfo = await apiUrl.data.map(c => {
        return {
            id: c.id,
            name: c.name,
            image: c.image.url,
            height: c.hight,
            weight: c.weight,
            temperament: c.temperament
        };
    });
    return apiInfo;
};
console.log(getApiInfo())

const getDbInfo = async() =>{
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes:['name'],
            through: {
                attributes:[],
            }
        }
    });
};

const getAllDogs= async() =>{
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


router.get('/Searching_dogs', async(req, res)=>{
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ? res.status(200).send(dogName) : res.status(400).send('No existe la raza');
    } else{
        res.status(200).send(dogsTotal)
    }
}) 
router.get('/temperaments', async(req, res) => {
    const temperApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key={YOUR_API_KEY}')
    const temperaments = temperApi.data.map((c) => c.temperament)
    const tempEach = temperaments.join().split(", ")
    const arrayFiltrado = [...new Set(tempEach)];
    //const arrayFiltrado = tempEach.filter((el, pos)=> tempEach.indexOf(el) === pos)
       
    console.log(arrayFiltrado)
    arrayFiltrado.forEach(c => {
        Temperament.findOrCreate({
             where: { name:c }
         })
    })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
})

router.get('/dogs/:id', async(req,res) =>{
    const id = req.params.id;
    
    const dogsTotal = await getAllDogs()
    if(id){
        let dogId = dogsTotal.filter(c => c.id == id)
        console.log(dogId)
        dogId.length? 
        res.status(200).json(dogId) : 
        res.status(404).send('No existe esa raza')
    }

})

     router.post('/dog', async(req,res)=>{
         let {
            name, 
            image,
            height,
            weight,
            temperament,
            createdInDb
        } = req.body
            
    let dogCreated = await Dog.create({
            name, 
            image,
            height,
            weight,
            createdInDb
    })
    console.log(dogCreated)
    let temperamentDb = await Temperament.findAll({where: { name: temperament}})
    dogCreated.addTemperament(temperamentDb)
    res.send('Perrito creado :)')
     });



module.exports = router;