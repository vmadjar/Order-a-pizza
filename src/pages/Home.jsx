import React from "react";
import {fetchPizzas} from '../redux/actions/pizzas';
import {addPizzaToCart} from '../redux/actions/cart';
import { Categories, SortPopup, PizzaBlock, Button } from "../components";
import {useDispatch, useSelector} from 'react-redux';
import {setCategory, setSortBy} from '../redux/actions/filters';

const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
const sortItems = [
  {name :"популярности", type: "popular"},
  {name: "цене", type: "price"},
  {name: "алфавиту", type: 'name'}
  ]

function Home() {
  const dispatch = useDispatch()
  const items = useSelector(({pizzas}) => pizzas.items)
  const cartItems = useSelector(({cart}) => cart.items)
  const {category, sortBy} = useSelector(({filters}) => filters)


  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
   }, [category, sortBy])

  const onSelectCategory = React.useCallback( (index) => {
    dispatch(setCategory(index))
  }, [])
  const onSelectSortType = React.useCallback( (type) => {
    dispatch(setSortBy(type))
  }, [])
  const handleAddPizzaToCart = obj => {
    dispatch( {
      type: 'ADD_PIZZA_CART',
      payload: obj
  })
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
        activeCategory = {category}
        onClickCategory={onSelectCategory} items={categoryNames}
        />
        <SortPopup activeSortType={sortBy} items={sortItems} onClickSortType = {onSelectSortType}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map(obj => (
            <PizzaBlock
             onClickAddPizza = {handleAddPizzaToCart}
              key={obj.id}
              addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
               {...obj}/>
          ))}
       
      </div>
    </div>
  );
}

export default Home;
