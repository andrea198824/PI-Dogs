const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const router = Router();
require("dotenv").config();
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const dogApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  let apiInfo = await dogApi.data.map((dog) => {
    //.data porque viene de axios - saco los valores que no quiero enviar
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric, //en sistema métrico (tambien viene imperial)
      weight: dog.weight.metric,
      life_span: dog.life_span,
      image: dog.image.url,
      temperament: dog.temperament,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    //me traigo la info de la base de datos del modelo Dog que incluye el
    // mod Temperament
    include: {
      //porque si no lo incluyo al crear un dog nunca me va a traer el
      // dog con el temperamento
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => { // Aquí está la información de la api + 
  const apiInfo = await getApiInfo();//la información de la base de datos
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

//hago los get que me pide el readme que son 4
//get dogs y get dogs búsqueda por name los hago en la misma ruta porque
// me trae la misma info (según se ingresa un name o no)
//el query se pasa por URL



router.get("/dogs", async (req, res, next) => {
  try {
    const name = req.query.name;
    let dogsTotal = await getAllDogs(); //me traigo todos, Db y api
    if (name) {
      // si hay un nombre por query
      let dogName = await dogsTotal.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length //si hay algún nombre
        ? res.status(200).send(dogName)
        : res
            .status(404)
            .send({ info: "Sorry, the dog you are looking for is not here." });
    } else {
      res.status(200).send(dogsTotal); //el otro caso es que no haya un
      //query y manda un status 200 con todos los dogs
    }
  } catch (error) {
    next(error);
  }
});

router.get("/temperament", async (req, res) => {
  const temperamentApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  let temperaments = temperamentApi.data.map((ob) => ob.temperament);
  temperaments = temperaments.join().split(",");
  temperaments = temperaments.filter((ob) => ob);
  temperaments = [...new Set(temperaments)].sort(); //con el constructor Set creo un objeto Set donde guardo los valores
  console.log(temperaments); //al pasarle el array temperaments todos sus elementos son agregados al nuevo Set y sort los ordena
  temperaments.forEach((ob) => {
    //para cada uno de ellos entrá al modelo Temperament y hacé un findOrCreate
    Temperament.findOrCreate({
      // es un método de sequelize usado para chequear si un elemento ya existe en la Db, y si no existe, lo va a crear.
      where: { name: ob }, //creáme estos temperamentos donde el nombre sea este elemento que estoy mapeando
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
});
router.get('/:id', (req,res) => {
  const { id } = req.params;
  allDogs()
  .then(dogs => {
      if(id) {
          let raza = dogs.filter(d => d.id == id);
          raza.length
          ? res.status(200).json(raza)
          : res.status(404).send('raza no existente');
      };
  });
});
router.post("/dog", async (req, res, next) => {
  try {
    const { name, height, weight, life_span, image, createdInDb, temperament } =
      req.body; 
    const newDog = await Dog.create({

      name,
      height,
      weight,
      life_span,
      image,
      createdInDb,
    });
    let temperamentDb = await Temperament.findAll({
      //dentro de mi modelo encontrá todos los temps que coincidan con lo que le paso por body
      where: { name: temperament }, //name es igual al temperament que le llega por body
    });
    await newDog.addTemperament(temperamentDb); 
    res.status(201).send({ info: "Dog created successfully!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;