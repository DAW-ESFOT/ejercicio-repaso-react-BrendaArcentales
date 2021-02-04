import React, { useEffect, useState } from 'react';
import {Col, Card, Modal,Button, Pagination} from 'antd';
import 'antd/dist/antd.css';
import '../styles/App.css';

const Books = ( props ) => {
    const [ listBooks, setListBooks ] = useState( props.listBooks );
    const [page, setPage] = useState(props.page);
    const [booksDetails, setBooksDetails] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [id, setId] = useState( null );

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://stark-spire-22280.herokuapp.com/api/books?page=${page}`
            );
            const json = await response.json();
            console.log("books", json);
            setListBooks(json.data);
            return json;
        };
        fetchBooks();
    }, [page]);
    useEffect(() => {
        const getBooksDetails = async () => {
            if(id){
                const response = await fetch(
                    `https://stark-spire-22280.herokuapp.com/api/books/${id}`
                );
                const booksDetailsJson = await response.json();
                console.log("json", booksDetailsJson);
                setBooksDetails(booksDetailsJson);
                setVisibleModal(true);
            }
        };
        getBooksDetails();
    }, [id]);
    const handleOk = () => {
        setVisibleModal(false);
    };

    const handleCancel = () => {
        setVisibleModal(false);
    };
    const handlePagination = (pages) => {
        setPage(pages);
    }

    return(
        <>
            {
                listBooks
                    ?
                    listBooks.map((book) =>(
                        <Card key = {book.id}
                              style = { {
                                  width: 330,
                                  display: 'inline-block'
                              } }
                        >
                            <div style={{display: 'flex'}}>
                                <Col className = "gutter-row" span={10}>
                                    <div>
                                        <img
                                            alt={book.title}
                                            src={book.cover_page}
                                            style={{
                                                width: 100,
                                                height: 150
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col className = "gutter-row" span={16}>
                                    <div>
                                        <h3 style={{fontWeight: 'bold'}}>{book.title}</h3>
                                        <h5>{book.author} - {book.year_edition}</h5>
                                        <h4>{book.price}</h4>
                                        <Button className='boton3' onClick={() => setId(book.id)}>Ver más</Button>
                                    </div>
                                </Col>
                            </div>
                        </Card>
                    ))
                    :'Cargando'
            }
            <Modal visible={visibleModal} onOk={handleOk} onCancel={handleCancel}>
                <div style={{display: 'flex'}}>
                    <Col className = "gutter-row" span={12}>
                        <div>
                            <p style={{fontWeight: 'bold'}}>{booksDetails.title}</p>
                            <p><strong>Autor:</strong> {booksDetails.author}</p>
                            <p><strong>Edición:</strong> {booksDetails.year_edition}</p>
                            <p><strong>Precio:</strong> ${booksDetails.price}</p>
                            <p><strong>Editorial:</strong> ${booksDetails.editorial}</p>
                            <p><strong>Páginas:</strong> {booksDetails.pages}</p>
                            <p style={{fontWeight: 'bold'}}>Sinopsis:</p>
                            <p>{booksDetails.synopsis}</p>
                            <p><strong>Disponible:</strong>
                                {
                                    booksDetails.available === true ?
                                        <p type="success"> Si</p> : <p type="danger"> No</p>
                                }
                            </p>
                            <p><strong>Categoría:</strong> {booksDetails.category}</p>
                        </div>
                    </Col>
                    <Col className = "gutter-row">
                        <div>
                            <img
                                alt={booksDetails.title}
                                src={booksDetails.cover_page}
                                style={{
                                    width: 100,
                                    height: 150,
                                    margin: 5
                                }}
                            />
                        </div>
                    </Col>
                    <Col className = "gutter-row">
                        <div>
                            <img
                                alt={booksDetails.title}
                                src={booksDetails.back_cover}
                                style={{
                                    width: 100,
                                    height: 150,
                                    margin: 5
                                }}
                            />
                        </div>
                    </Col>
                </div>
            </Modal>
            <Col>
                <Pagination style={{ textAlign: 'center'}}
                            defaultCurrent={1}
                            total={50}
                            onChange={handlePagination}
                />
            </Col>
        </>
    )


}
export default Books;