import { useState, useEffect } from 'react'


export default function TheForm() {
  const initialFormData = {
    name: '',
    price: 0,
    image: '',
    content: '',
    category: '',
    tags: [],
    isPublished: false,
  }

  const [articolsList, setArticolsList] = useState([
    {
      "id": 0,
      "name": "Albero di Natale Bianco",
      "price": 29.99,
      "image": "https://www.picclickimg.com/FvYAAOSwzHdfxtKf/Albero-di-Natale-Bianco-e-Argento-con-100.webp",
      "content": "Un magnifico albero di Natale bianco per decorare la tua casa durante le festività.",
      "category": "decorazioni",
      "tags": ["bianco", "verde"],
      "isPublished": true
    },
    {
      "id": 1,
      "name": "Calze Rosse con Babbo Natale",
      "price": 12.99,
      "image": "https://cioccacom.b-cdn.net/3070-large_default/calze-corte-fantasia-babbo-natale.jpg",
      "content": "Calze rosse con adorabili disegni di Babbo Natale, perfette per il periodo natalizio.",
      "category": "decorazioni",
      "tags": ["rosso", "verde"],
      "isPublished": true
    },
    {
      "id": 2,
      "name": "Ghirlanda luminosa",
      "price": 24.99,
      "image": "https://m.media-amazon.com/images/I/81mQYOBg4tL._AC_UF894,1000_QL80_.jpg",
      "content": "Una splendida ghirlanda luminosa da appendere alla porta di casa per un'accoglienza natalizia.",
      "category": "illuminazione",
      "tags": ["bianco", "verde"],
      "isPublished": true
    }
  ])

  const [formData, setFormData] = useState(initialFormData)

  const [editingArticol, setEditingArticol] = useState(null);


  function changeValueForm(value, fieldName){
    const newFormData = { 
      id: articolsList.length + 1,
      ...formData };
      
      if(fieldName === "tags"){
        newFormData[fieldName].push(value)
      }else{
        // aggiorno la chiave fieldName con il valore newValue
        newFormData[fieldName] = value

      }
  
  
    // passo l'oggetto modificato a setFormData
    setFormData(newFormData);
  } 

  function sendForm(e){
    e.preventDefault();

    setArticolsList([...articolsList, {
      ...formData,
    }]);

    // Resetto il form
    setFormData(initialFormData);
    console.log(formData)
  }



  function destroyArticol(id){
    const newArticolList = articolsList.filter((articol) => articol.id !== id)
   
    setArticolsList(newArticolList)
    console.log(articolsList)
  }

  function updateArticol(id) {
    const find = articolsList.find((articol) => articol.id === id);
    // Trova l'articolo da modificare
    setEditingArticol(find);
    destroyArticol(id);
    // Aggiorna lo stato formData con l'articolo da modificare e gli altri articoli
    setFormData({ ...find });
  }
  
  useEffect(() => {
    if( editingArticol !== null && formData.isPublished !== editingArticol.isPublished ){
      if(formData.isPublished === true){
    alert("stai rendendo l'articolo pubblico")
   }else if(formData.isPublished === false){
    alert("stai rimuovendo l'articolo dallo shop")
   }
    }
   
   
  }, [formData.isPublished]);
  
  return (
    <>
    <ul className="articolsList">
      <h1>
        articoli pubblicati sullo shop
      </h1>
     { articolsList.map((articol) => { 
      
      if(articol.isPublished){
        return (
          <li className='card' key={articol.id}> 

            <img src={articol.image} alt={"l'immagine dell'articolo " + articol.name + " non è al momento disponibile"} />
            
            <div>
              {articol.category}
            </div>
            <div>
              {articol.name} - {articol.price} € 
            </div>

            <p>
              {articol.content}
            </p>

            {articol.tags.map(tag => tag + ", " )}
            

            {/* buttons */}
            <div>
              <button onClick={() => {destroyArticol(articol.id)}}><i className="fa-solid fa-trash-can"></i></button> 
              <button onClick={() => {updateArticol(articol.id)}}><i className="fa-solid fa-marker"></i></button>
            </div>
          </li>
          
          )
          
      }else{
        return
      }
          })}
    </ul>
      <form onSubmit={sendForm}>

      <div className='addItemsSection'>
        <h2>ADD NEW ITEMS ON OURS CHRISTMAS SHOP</h2>
        <div>
          <label htmlFor="name">nome articolo</label>
          <input type="text" value={formData.name} onChange={(e) => changeValueForm(e.target.value, "name")}/>
        </div> 

        <div>
          <label htmlFor="price">prezzo articolo</label>
          <input type="number" value={formData.price} onChange={(e) => changeValueForm(e.target.value, "price")}/>
        </div>
        <div>
          <label htmlFor="image">Immagine:</label>
          <input type="text" id="image" value={formData.image} onChange={(e) => changeValueForm(e.target.value, "image")} />
        </div>

        <div>
          <label htmlFor="content">Contenuto:</label>
          <textarea id="content" value={formData.content} onChange={(e) => changeValueForm(e.target.value, "content")} />
        </div>

        <div>
          <label htmlFor="category">Categoria:</label>
          <select id="category" value={formData.category} onChange={(e) => changeValueForm(e.target.value, "category")}>
            <option value="">Seleziona una categoria</option>
            <option value="giocattoli">giocattoli</option>
            <option value="decorazioni">decorazioni</option>
            <option value="esterno">esterno</option>
            <option value="illuminazione">illuminazione</option>
          </select>
        </div>

        <div>
          <label>Tags:</label>
          <br />
          <input type="checkbox" id="bianco" value="bianco" onChange={(e) => changeValueForm(e.target.value, "tags")} /> bianco
          <input type="checkbox" id="rosso" value="rosso" onChange={(e) => changeValueForm(e.target.value, "tags")} /> rosso
         
        </div>

        <div>
          <label htmlFor="isPublished">Pubblicato:</label>
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => changeValueForm(e.target.checked, "isPublished")}
          />
        </div>

        <button type="submit">Invia</button>
      </div>

      </form>


      <ul className="articolsList">
        <h1>
          articoli non pubblicati sullo shop
        </h1>
     { articolsList.map((articol) => { 
    

      if(!articol.isPublished){
        return (
          <li className='card' key={articol.id}> 

            <img src={articol.image} alt={"l'immagine dell'articolo " + articol.name + " non è al momento disponibile"} />
            
            <div>
              {articol.category}
            </div>
            <div>
              {articol.name} - {articol.price} € 
            </div>

            <p>
              {articol.content}
            </p>

            {articol.tags.map(tag => tag + ", " )}
            

            {/* buttons */}
            <div>
              <button onClick={() => {destroyArticol(articol.id)}}><i className="fa-solid fa-trash-can"></i></button> 
              <button onClick={() => {updateArticol(articol.id)}}><i className="fa-solid fa-marker"></i></button>
            </div>
          </li>
          
          )
          
      }else{
        return
      }
          })}
    </ul>

    </>
  )
}
