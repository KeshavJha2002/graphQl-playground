import { useQuery,gql } from "@apollo/client"

const query = gql`
      query AnyQueryName{
        getTodos {
          title,
          id,
          user {
            name
          }
        }
      }
    `

const App:React.FC = () => {
  const { data,loading } = useQuery(query);
  if(loading) return (<h1>Loading</h1>)
  return (
    <div className="text-black">
      <ul>
        {data.getTodos.map((todo:any)=> <li key={todo.id}>{todo.user.name}</li>)}
      </ul>
    </div>
  )
}

export default App
