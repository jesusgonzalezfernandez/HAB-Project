import QuestionsFilter from "./QuestionsFilter";
import LatestQuestions from "./LatestQuestions";
import './QuestionsPortal.css'
import useFetch from "../useFetch";
import getTagCount from "../Functions/getTagCount";
import { useState } from "react";
import FilteredQuestions from "./FilteredQuestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Loading from "../Home/Loading";

/* 

    Portal de preguntas. Recibe una query
    con el valor de los tags si la URL es 
    questions?tags=...

    Esa Query se envía al filtro, y si 
    existe sustituye al formulario.

*/

function QuestionsPortal({ query }) {

    // Estado que define el resultado del filtrado
    const [filterData, setFilterData] = useState([])

    // Estado que define el tipo de display (últimas o filtradas)
    const [filterMode, setFilterMode] = useState(false)

    // Paginación
    const [pagination, setPagination] = useState(5)
    
    // Página actual
    const [page, setPage] = useState(1)

    // Valor de páginas máximo (definido por los componentes LatestQuestions y FilteredQuestions)
    const [max, setMax] = useState(1)

    // Estado que define el filtro del título en el cliente
    const [titleFilter, setTitleFilter] = useState()

    // Estado que define el filtro del contenido en el cliente
    const [bodyFilter, setBodyFilter] = useState()

    // Estdo que define el filtro de fecha
    const [timeFilter, setTimeFilter] = useState()

    // Estado que define el tipo de ordenación
    const [sortBy, setSortBy] = useState('')

    // Obtener listado de preguntas
    let data = useFetch('http://localhost:3001/questions') || []
    
    let tagCounter = []

    if (data.length >= 1) tagCounter = getTagCount(data)

    return (

        <div className="questions-portal">
            <aside className='left-aside'>
                <div className='links'>
                    <a href="">Tags</a>
                    <a href="">Users</a>
                    <a href="">Jobs</a>
                    <a href="">Courses</a>
                    <a href="">Software</a>
                </div>

                <QuestionsFilter 
                    query={query}
                    reload={data => {setFilterData(data); setFilterMode(true)}} 
                />
            
            </aside>

            <main className='main-content'>

                <header>

                    <div className='main-content-header-info'>

                        {!filterMode && <h1 className=''>Últimas Preguntas</h1>}
                        {filterMode && filterData &&
                            <div>
                                <h2 className=''>Resultados: {query ? <Loading query={query}/> : 'filtro'} </h2>
                            </div> 
                        }
                        <div className=''>
                            <a className='create-question-button' href='http://localhost:3000/create/question'>Haz Tu Consulta</a>
                        </div>

                    </div>

                    <div className='main-content-header-toolbar'>

                        <button onClick={e => setSortBy( sortBy === 'views' ? '!views' : 'views')}>Views</button>
                        <button onClick={e => setSortBy( sortBy === 'answers' ? '!answers' : 'answers')}>Hot</button>
                        <button onClick={e => setTimeFilter('week')}>Last Week</button>
                        <button onClick={e => setTimeFilter('month')}>Last Month</button>
                        <input 
                            type="text" 
                            placeholder='Filtrar por Título...' 
                            onChange={e => setTitleFilter(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder='Filtrar por Contenido...' 
                            onChange={e => setBodyFilter(e.target.value)}
                        />

                    </div>

                    <div className='main-content-header-options'>

                        <div className='return-button-container'>
                            {filterMode && filterData && 
                                <Link to="/questions">
                                    <button className='return-button' onClick={() => setFilterMode(false)}>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} color="#3307ad" size="2x" />
                                    </button>
                                </Link>
                            }
                        </div>

                        {/* Control de Paginación */}
                        <div className='pagination-set'>
                            <h6>Resultados / Página:</h6>
                            <select name="pagination" value={pagination} 
                                onChange={e => 
                                    {setPagination(e.target.value);

                                    /* 
                                    
                                        Resetear el valor de la página para evitar desfases.
                                        
                                        Por ejemplo, con paginación 5, y estando en la página
                                        15/20, al cambiar a paginación 10, nos quedaríamos
                                        en 15/10.
                                        
                                        Al resetear el valor de la página actual, 
                                        se tiene en cuenta el valor actual y el valor
                                        al que va a cambiar para encontrar la relación
                                        entre ambas para calcular cual sería
                                        página correcta. 
                                        
                                        *Debido al redondeo puede haber desplazamientos
                                    
                                    */

                                    setPage(Math.ceil( 
                                        page !== 1 ? (
                                            pagination < e.target.value ? 
                                            page * (pagination / e.target.value) 
                                            : page / (e.target.value / pagination) )
                                        : 1
                                        
                                        ))}}>
                                            
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                            </select>
        
                        </div>
        
                        {/* Control de Pagina */}
                        <div className='pagination'>
        
                            <span onClick={() => setPage(page > 1 ? page - 1 : 1)}>◄</span>
                            <span>{page} / {max}</span>
                            <span onClick={() => setPage(page < max ? page + 1 : max)}>►</span>
        
                        </div>

                    </div>

                </header>


                {!filterMode &&  

                    <LatestQuestions 
                        setMax={value => setMax(value)}
                        pagination={pagination} 
                        page={page}
                        titleFilter={titleFilter}
                        bodyFilter={bodyFilter}
                        timeFilter={timeFilter}
                        sortBy = {sortBy}
                    />

                }

                {filterMode && filterData &&

                    <div>

                       
                        <FilteredQuestions 
                            data={filterData} 
                            setMax={value => setMax(value)} 
                            pagination={pagination}
                            page={page}
                        />

                    </div>
                }

            </main>

            <aside className='right-aside'>
                <section className='blog'>
                    <h6>Latest Blog Posts:</h6>
                    <ul className='post-list'>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur.</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, earum!</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt optio odio minus?</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                    </ul>
                </section>
                <section className="tags">
                    {tagCounter && tagCounter.map( (tagCount, i) =>             
                        <div key={i} className='tag-counter'>
                            <Link to={'/questions?tags=' + tagCount.tag} 
                                // El tag toma diferentes tamaños según el orden en el array
                                className={i < tagCounter.length / 2 ? ( i < tagCounter.length / 6 ? 'big' : '' ) : 'small'} 
                                href={'http://localhost:3001/questions?tags=' + tagCount.tag}>
                                    {tagCount.tag} 
                            </Link>
                            <span>x {tagCount.count}</span>
                        </div>
                    )}
                </section>
            </aside>
        </div >
    );
}

export default QuestionsPortal;