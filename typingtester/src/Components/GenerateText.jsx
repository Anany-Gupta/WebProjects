import faker from "faker";

let GenerateText = (count) => {
  let para = faker.random.words(count=100).split('-').join(" ").toLowerCase();

  return(
    <>

    <div className="displayText">
      <p>{para}</p>
    </div>
    <div className="text-tools">
      <i className="material-icons-round">replay</i>
    </div>
    </>
  );
};

export default GenerateText;
