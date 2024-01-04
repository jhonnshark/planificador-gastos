import { useEffect, useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

const App = () => {
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos')
            ? JSON.parse(localStorage.getItem('gastos'))
            : []
    );
    const [gastoEditar, setGastoEditar] = useState({});
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);
            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);

    // Guardando en localStore
    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto]);

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);

    useEffect(() => {
        if (filtro) {
            // Filtrar gastos por Categoría
            const response = gastos.filter(
                (gasto) => gasto.categoria === filtro
            );
            setGastosFiltrados(response);
        }
    }, [filtro]);

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);

    const handleNuevoGasto = () => {
        setGastoEditar({});
        setModal(true);
        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    const guardarGasto = (gasto) => {
        if (gasto.id) {
            //Actualizar
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            );
            setGastos(gastosActualizados);
            setTimeout(() => {
                setGastoEditar({}); // Reseteando el state
            }, 500);
        } else {
            //Nuevo Gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
        setGastos(gastosActualizados);
    };

    return (
        <div className={modal ? 'fijar' : null}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Nuevo Gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}
            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
};

export default App;
