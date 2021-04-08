import React, { useState, useEffect } from "react";
import { BicycleSpecs } from "../../../../../assets/additional/form-helpers";
import { Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "semantic-ui-react";
import "./SpecMobile.styles.scss";

export const SpecMobile = (props) => {
  const [newItems, setNewItems] = useState([]);
  const [restricted, setRestricted] = useState(false);
  const [errors, setErrors] = useState([{}]);

  const [showRemove, setShowRemove] = useState(0);

  useEffect(() => {
    addNewItem();
  }, []);

  const addNewItem = () => {
    const lastItem = newItems.length
      ? newItems[newItems.length - 1]
      : [{ item: "a" }];
    const values = [...newItems];

    if (lastItem.item !== "") {
      values.push({ idx: uuidv4(), item: "", value: "" });
      setNewItems(values);
      setRestricted(false);
    } else {
      setRestricted(true);
    }
  };

  useEffect(() => {
    let specArr = newItems.filter((i) => i.value.length);
    props.callback("description", specArr);
  }, [newItems]);

  const labelChange = (e, id) => {
    e.preventDefault();
    const values = [...newItems];
    let checkPoint = newItems.map(({ item }) => item).includes(e.target.value);
    if (checkPoint) {
      setErrors(true);
      return;
    } else {
      const currentSpec = BicycleSpecs.filter(
        (i) => [...i.item].sort() + "" === [...e.target.value].sort() + ""
      );
      const currentSpecIndex = currentSpec.map((i) => i.idx).join();
      let newItemsIndex = values.findIndex((row) => row.idx === id);
      values[newItemsIndex].idx = Number(currentSpecIndex);
      values[newItemsIndex].item = e.target.value;
      setNewItems(values);
      setErrors(false);
    }
  };

  const valueChange = (e, id) => {
    e.preventDefault();
    const values = [...newItems];
    let index = newItems.findIndex((row) => row.idx === id);
    values[index].value = e.target.value;
    setNewItems(values);
  };

  const toggleOn = (id) => {
    setShowRemove(id);
  };

  const toggleOff = () => {
    setShowRemove();
  };

  const removeDescription = (id) => {
    const values = newItems.filter((i) => i.idx !== id);
    setNewItems(values);
  };

  return (
    <>
      <div className="description-update-form">
        {console.log(newItems)}
        {newItems.map(({ item, value, idx }) => (
          <Form.Group
            key={idx}
            onMouseEnter={() => toggleOn(idx)}
            onMouseLeave={() => toggleOff()}
          >
            <div className="description-label-wrapper">
              <Form.Control
                as="select"
                size="sm"
                className="spec-select"
                onChange={(e) => labelChange(e, idx)}
                value={item}
                custom
                required
              >
                {BicycleSpecs.map(({ item, value, idx }) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Control>
              <Icon
                className="remove-old"
                name="remove"
                onClick={() => removeDescription(idx)}
              />
            </div>
            <Form.Control
              className="input-field"
              type="text"
              size="sm"
              autoComplete="off"
              value={value}
              onChange={(e) => valueChange(e, idx)}
              required
            />
          </Form.Group>
        ))}
        <div
          className={`${
            restricted && "add-restricred-wrapper"
          } add-spec-wrapper`}
          onClick={addNewItem}
        >
          <AddIcon />
        </div>
      </div>
    </>
  );
};
