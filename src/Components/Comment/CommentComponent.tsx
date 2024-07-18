import React from 'react';
import { CardComment, DateComment, DetailsComment, IconsComment, ImagenComment, NameComment } from "./CommentStyled";
import { FiXCircle } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import commentsData from '../../data/comments.json';  

export const CommentComponent = () => {
    const data = commentsData;  

    return (
        <>
            {data.map((comment) => (
                <CardComment key={comment.id}>
                    <p>{comment.client.name}</p>
                    <DetailsComment>
                        <ImagenComment src={comment.img}/>  
                        <DateComment>
                            <NameComment $name='true'>{comment.client.name}</NameComment>
                            <NameComment>{comment.date}</NameComment>
                        </DateComment>
                        <IconsComment>
                            <FaRegCheckCircle />
                            <FiXCircle />
                        </IconsComment>
                    </DetailsComment>
                </CardComment>
            ))}
        </>
    )
}
