import React from 'react';
import { CardComment, DateComment, DetailsComment, IconsComment, ImagenComment, NameComment } from "./CommentStyled";
import { FiXCircle } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import commentsData from '../../data/comments.json';  // Importa los datos del JSON

export const CommentComponent = () => {
    const data = commentsData;  // Asigna los datos importados

    return (
        <>
            {data.map((comment) => (
                <CardComment key={comment.id}>
                    {/* Utiliza `comment.client.name` para acceder al nombre del cliente */}
                    <p>{comment.client.name}</p>
                    <DetailsComment>
                        {/* Asegúrate de que `comment.img` esté disponible en tu JSON */}
                        <ImagenComment src={comment.img}/>  
                        <DateComment>
                            {/* Renderiza el nombre del cliente y la fecha del comentario */}
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
