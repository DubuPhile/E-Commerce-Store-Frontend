import '../Styles/FooterStyle.css'

const Footer = () => {
  return (
    <footer>
      <section className="footer">
        <h3 className="Information">Information</h3>
        <address>
          <div>
          E-commerce Store<br/>
          Manila bulletin board
          <br/>
          Email: <a href="mailto:inquiries@acmerockets.com">Inquires@E-commerceStore.com</a>
          <br />
          Phone: <a href="tel:+15555555555"> (555) 555-5555</a>
          </div>
          <div className="copyrights">
            <p >Copyright &copy; <span id="year">{new Date().getFullYear()}</span></p>
            <p >All Rights Reserved</p>
          </div>
        </address>
      </section>
    </footer>
  )
}

export default Footer