import logo from '../assets/logo.png'

function Error404() {
  return (
    <section className="p-5 text-center mt-10">
      <p className='text-4xl font-bold'>404</p>
      <p
        className="italic text-xl"
      >Página não encontrada!</p>
      <div className='flex justify-center mt-10'>
        <img src={logo} />
      </div>
    </section>
  )
}

export default Error404;
