import React from 'react'
import ReviewForm from '../ReviewForm/ReviewForm'
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';


const Review = ({ getMovieData, movie, reviews, setReviews }) => {

    const params = useParams();
    const { id } = params;
    const reviewText = useRef();
    const labelText = "Write a new review ?"

    // const space = (
    //     <Row>
    //         <Col>
    //             <hr />
    //         </Col>
    //     </Row>
    // )

    useEffect(() => {
        getMovieData(id);
    }, []);

    const addReview = async(e) => {
        e.preventDefault();
        const review = {
            reviewBody: reviewText.current.value,
            imbdId: id
        }
        console.log(review);
        try{
            const response = await axios.post(process.env.REACT_APP_API_URL + '/reviews', review );
            const {data} = response;
            console.log(data);

            const updatedReviews = [...reviews, {body: review.reviewBody}];
            reviewText.current.value = "";
            setReviews(updatedReviews)

        }catch(err){
            console.log(err);
        }
     };


    return (
        <Container>
            <Row>
                <Col>
                    <h3>reviews</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={reviewText} labelText={labelText} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map(review => (
                            <>
                                <Row key={review.id}>
                                    <Col>
                                        {review.body}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        ))
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Review