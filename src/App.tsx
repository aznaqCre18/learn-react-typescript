import { useState } from 'react';
import { useQuery } from 'react-query';

//Components
import { LinearProgress, Drawer, Grid, Badge } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Item from './Item/Item';
import Cart from './Cart/Cart';

//Styled
import { IconButtonCust, Wrapper } from './App.style';

//Type 
export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number,
}

const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () =>  {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);

  const handleGetTotalItem = (items: CartItemType[]) => {
    return items.reduce((acumulator: number, item) => acumulator + item.amount, 0);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prevState => {
      const isItemInCart = prevState.find(item => item.id === clickedItem.id);

      if(isItemInCart) {
        return prevState.map(item => item.id === clickedItem.id ? {...item, amount: item.amount + 1 } : item)
      }

      return [...prevState, {...clickedItem, amount: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prevState => 
      prevState.reduce((ack, item) => {
        console.log(ack, "<<< ACK");
        console.log(item, "<<< ITEM");
        if(item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          console.log(item, "ACK")
          return [...ack, item];
        }
      }, [] as CartItemType[]) 
    );
  };

  //if loading when fetching data
  if(isLoading) return  <LinearProgress />;

  //if error when fetching data
  if(error) return <div>Something went wrong</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} >
        <Cart 
          cartItems={cartItems} 
          addToCart={handleAddToCart} 
          removeFromCart={handleRemoveFromCart} 
        />
      </Drawer>
      <IconButtonCust onClick={() => setCartOpen(true)}>
        <Badge badgeContent={handleGetTotalItem(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </IconButtonCust>
      <Grid container spacing={3} >
          {
            data?.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} >
                  <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
              )
            }) 
          }
      </Grid>
    </Wrapper>
  );
}

export default App;
