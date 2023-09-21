function LoginPage () {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="code">Inscrição</label>
          <input
            type="text"
            id="code"
            name="code"
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>
      </form>
    </div>
  )
}

export default LoginPage;