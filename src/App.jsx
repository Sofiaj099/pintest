import { ProveedorPines } from './contexto/ContextoPines';
import { Navegacion } from './componentes/Navegacion';
import { MallaPines } from './componentes/MallaPines';
import { ModalPin } from './componentes/ModalPin';

export default function App() {
  return (
    <ProveedorPines>
      <div className="min-h-screen bg-white text-gray-900">
        <Navegacion />
        <main>
          <MallaPines />
        </main>
        <ModalPin />
      </div>
    </ProveedorPines>
  );
}