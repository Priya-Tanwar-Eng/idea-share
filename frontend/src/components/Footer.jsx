import React from 'react'

const Footer = () => {
  return (
    <footer style={{backgroundColor:"darkgray", color:"white", textAlign:"center", zIndex:10, position:"relative"}}>
      <div style={{gridAutoColumns:"1fr", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"20px", padding:"20px"}}>

      <div style={{display:"flex", flexDirection:"column", marginRight:"50px"}}>
        <h3>About</h3>
          <p>We are dedicated to providing the best service to our customers. Our mission is to deliver excellence in everything we do.</p>
          <p>Founded in 2020, we've been growing ever since. </p>
      </div>

       <div>
        <h3>Contact Us</h3>
        <p>info@gmail,com</p>
        <p>support@gmail.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Main St, Anytown, USA</p>
       </div>

      <div style={{display:"flex" ,flexDirection: "column", gap:"15px", marginBottom:"10px"}}>
        <h3>Follow Us</h3>

        <p>Stay connected with us on social media for the latest update and news</p>
         <div style={{display: "flex", justifyContent: "space-between"}}>

        <p>insta</p>
        <p>linkdin</p>
        <p>facebook</p>
        <p>whatsApp</p>
         </div>
      </div>
      </div>

      <p>&copy; 2024 IdeaShare. All rights reserved.</p>
    </footer>
  )
}

export default Footer