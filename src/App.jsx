import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { Field, Input, Label } from '@headlessui/react'


function App() {

  const [breeds, setBreeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [next, setNext] = useState('');
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  const URL = 'https://catfact.ninja/breeds?limit=20'
  const URL_ALL = 'https://catfact.ninja/breeds'
  const URL_DOGS = 'https://dog.ceo/api/breeds/list/all'

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(URL);
        setBreeds(response.data.data);
        setNext(response.data.next_page_url)
        setFilteredUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching the dog images:', error);
      }
    };
    fetchDogs();
  }, []);

  const fetchMoreData = () => {
    axios
      .get(next)
      .then((res) => {
        setFilteredUsers((prevItems) => [...prevItems, ...res.data.data]);
        res.data.data.length > 0 ? setHasMore(true) : setHasMore(false);
        setNext(res.data.next_page_url)
        console.log(filteredUsers);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = breeds.filter((user) =>
      user.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  return (
    <div className="App bg-white">
      <header className="">
        <div className="py-4 mt-4 text-black font-bold text-3xl">Movies List </div>
      </header>

      <Field className={'flex flex-col items-center'}>
        <Input value={searchItem}
          onChange={handleInputChange} type="text" name="full_name" className="p-2 rounded border data-[hover]:shadow data-[focus]:bg-blue-100" />
      </Field>

      <InfiniteScroll
        dataLength={filteredUsers.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className='p-4 text-black'>Loadiiiiing!!!</div>}
      >
        <div className='mt-6'>
          <div className='mx-8 grid grid-cols-3'>
            {filteredUsers &&
              filteredUsers.map((item) => (
                <div key={item.breed} className='m-2 rounded-lg p-6 border border-orange-300 bg-orange-200'>
                  <h1 className='text-3xl font-bold'>{item.breed}</h1>
                  <button className='cursor-pointer'>Add</button>
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
