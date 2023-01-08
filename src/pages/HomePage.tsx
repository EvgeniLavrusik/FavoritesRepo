import React, { useEffect } from "react";
import { useSearchUsersQuery,useLazyGetUserReposQuery } from "../store/github/github.api";
import { useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { Repo } from "../components/Repo";

export function HomePage() {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search);
 const [dropdown,setDropdown] = useState(false)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });

  const [fetchRepos,{isLoading:isLoadingRepo,data:repos}] = useLazyGetUserReposQuery();
  useEffect(()=>{setDropdown(debounced.length>3 && data?.length! > 0);
  }, [debounced, data])
  const clickHandler = (user: string) => {
    fetchRepos(user);
    setDropdown(false)
  }
    return (
      <div className="flex justify-center pt-10 mx-auto w-screen ">

        {isError && <p className="text-center text-red-600">Error... </p>}
<div className="relative w-[560px]">
        <input className=" border py-2 px-4 w-full h-[42px] mb-2 " type="text" placeholder="Search Github users..." value={search} onChange={e=>setSearch(e.target.value)} />

       {dropdown && <ul className="list-none absolute top-[42px] left-0 rigth-0 overflow-y-scroll max-h-[200px] shadow-md bg-white">
         
          {isLoading && <p className="text-center">Loading...</p>}
          {data?.map(user => (
            <li key={user.id} onClick={()=>clickHandler(user.login)} className='cursor-pointer py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors'>{user.login}</li>
))}

          </ul>}
          <div className="container" >
          {isLoadingRepo && <p className="text-center">User repos are loading...</p>}
            {repos?.map(repo => <Repo repo={repo} key={repo.id} />)}
        </div>
        </div>
        
        </div>
    )
}


