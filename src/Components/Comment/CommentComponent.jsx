import { CardComment, DateComment, DetailsComment, IconsComment, ImagenComment, NameComment } from "./CommentStyled";
import { FiXCircle } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

export const CommentComponent = () => {



    return (
        <>
            {data.map((comment) => {
                <CardComment key={comment.id}>
                    <p>{comment.name}</p>
                    <DetailsComment>
                        <ImagenComment src={comment.img}/>
                        <DateComment>
                            <NameComment $name='true'>{comment.name}</NameComment>
                            <NameComment>{comment.date}</NameComment>
                        </DateComment>
                        <IconsComment>
                            <FaRegCheckCircle />
                            <FiXCircle />
                        </IconsComment>
                    </DetailsComment>
                </CardComment>
            })}
        </>
    )
}