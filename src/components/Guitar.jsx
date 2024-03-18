
const Guitar = ({guitar, addToCart}) => {

    const {id, name, price, image, description } = guitar;

    
  return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">$ {price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                    // onClick={() => setCart([...cart, guitar])}
                    //en vez de crear una funcion lo mando a llamar una vez en el onClick
                    // setCart es para ponerlo en el carrito "...cart" hago una copia de lo que ya habia en el state y "guitar" es la nueva guitarra  
                >Agregar al Carrito</button>
            </div>
        </div>  
    )
}

export default Guitar