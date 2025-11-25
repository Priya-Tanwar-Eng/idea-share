import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <div style={styles.heroSection}>
        <div style={styles.leftBox}>
          <h1 style={styles.title}>Turn Your Ideas Into Reality</h1>
          <p style={styles.subtitle}>
            Share, Learn and Build Together. A platform where students bring
            their creativity to life.
          </p>
          <button style={styles.startBtn}>Get Started</button>
        </div>

      </div>

      <Footer />
    </>
  );
}

const styles = {
  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "60px 80px",
    background: "linear-gradient(90deg, #ffffff, #e3f2fd)",
  },

  leftBox: {
    width: "50%",
  },

  title: {
    fontSize: "48px",
    fontWeight: "700",
    fontFamily: "Poppins, sans-serif",
    marginBottom: "20px",
    color: "#1e3a8a",
  },

  subtitle: {
    fontSize: "20px",
    fontFamily: "Inter, sans-serif",
    lineHeight: "30px",
    marginBottom: "30px",
    color: "#444",
  },

  startBtn: {
    padding: "14px 30px",
    backgroundColor: "#22c55e", 
    color: "#fff",
    border: "none",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },

  rightBox: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
  },

  heroImg: {
    width: "100%",
    maxWidth: "450px",
  },
};

export default Home;
