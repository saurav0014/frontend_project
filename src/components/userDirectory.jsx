import { Link } from "react-router-dom";
const UserDirectoryPage = (params) => {
    const { users } = params;
    return (
        <div className='m-4'>
          <h1 className="text-2xl font-bold mb-4 text-center">Directory</h1>
          {users.map((user) => (
            <div key={user.id} className="mb-4">
              <Link to={`/user/${user.id}`}>
                <div className="flex justify-between border p-4 rounded-lg items-center">
                  <div className="flex items-center">
                    <h3 className="text-lg mr-4">{user.name}</h3>
                  </div>
                  <div>
                    <p className="text-right">Posts :{users.length}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
}
export default UserDirectoryPage;
