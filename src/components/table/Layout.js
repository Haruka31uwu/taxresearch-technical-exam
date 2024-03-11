import { Button } from "../commons/CommonsComponents"
export  const Header = ({title,optionButton,events}) => {
return(
    <div className="w-full flex flex-row justify-between mx-auto pt-5">
        <h1 className="ms-10 text-3xl font-bold">{title}</h1>
        <Button text={optionButton} onClick={events.onClick}/>
    </div>
)
}
