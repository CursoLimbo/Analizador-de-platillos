import React from "react";
import InformationCard from "@/components/InformationCard";
import Updatecard from "@/components/Updatecard";

interface CardActionsProps{
    isGoingToUpdate: boolean,
    type: "business" | "personal"
    title: string
    name: string,
    email: string,
    phone: string,
    photo: string,
    onPictureChanged: (publicId: string) => void
}

const CardActions: React.FC<CardActionsProps> = (props) => {
const {type, title, name, email, phone, photo, onPictureChanged, isGoingToUpdate} = props;
console.log(isGoingToUpdate, "Card Actions")

    return<>
        {

            isGoingToUpdate ? <Updatecard type={type} title={title} name={name} email={email} phone={phone} photo={photo}></Updatecard> :
            <InformationCard type={type} title={title} name={name} email={email} phone={phone} photo={photo} onPictureChanged={onPictureChanged}></InformationCard>

        }
    </>
}

export default CardActions;