function UserCard({ user }) {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;
  console.log(user);
  return (
    <div className="card bg-orange-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " ," + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn bg-blue-500">Ignore</button>
          <button className="btn bg-pink-500">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
