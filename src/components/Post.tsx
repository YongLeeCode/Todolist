import { useState } from "react";

function Post(props: {selected: boolean}) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }
  const items = [
    {id: 0, 
      tenantId: '테1',
      name: 'name1',
      memo: '',
      imageUrl: '',
      isCompleted: false,
    },
    {id: 1, 
      tenantId: '테2',
      name: 'name2',
      memo: '',
      imageUrl: '',
      isCompleted: true,
    }
  ];

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          {item.isCompleted==props.selected && (
            <>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <h4>{item.name} </h4>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default Post;