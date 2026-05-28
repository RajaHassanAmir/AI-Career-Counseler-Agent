import AppRouter from "./routes/AppRouter";

function App() {

  return (

    <div className="min-h-screen bg-[#07111f] text-white overflow-x-hidden relative">

      {/* AI BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-emerald-500/20 blur-[130px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-120px] w-[550px] h-[550px] bg-cyan-500/20 blur-[140px] rounded-full" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-violet-500/10 blur-[120px] rounded-full" />

      </div>

      {/* ROUTER */}
      <AppRouter />

    </div>
  );
}

export default App;