//Components
import { Button } from "@material-ui/core";

//Types
import { CartItemType } from "../App";

//Styled
import { Wrapper } from "./Item.styles";

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => {

    const limitationString = (text:string, maxLength: number) => {
        let textLimit = text;
        let limit = maxLength;
        
        return textLimit.slice(0, limit) + (text.length > limit ?  "..." : "");
    }

    return (
        <Wrapper>
            <img src={item.image} alt={item.title} />
            <div>
                <h3>{limitationString(item.title, 60)}</h3>
                <p>{limitationString(item.description, 120)}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
        </Wrapper>
    )
}

export default Item;