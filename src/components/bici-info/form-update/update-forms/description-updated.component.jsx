import React, { useState, useEffect } from "react";
import { BicycleSpecs } from "../../../../assets/additional/form-helpers";
import { Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "semantic-ui-react";

export const DescriptionUpdate = (props) => {
  const [availableSpecs, setAvailableSpecs] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [restricted, setRestricted] = useState(false);

  const [showRemove, setShowRemove] = useState(0);

  useEffect(() => {
    const filteredSpecs = BicycleSpecs.filter(
      ({ idx: x }) => !props.description.some(({ idx: y }) => x === y)
    );
    setAvailableSpecs(filteredSpecs);
  }, [props.description]);

  const addNewItem = () => {
    const lastItem = props.description.length
      ? props.description[props.description.length - 1]
      : [{ item: "a" }];
    const values = [...newItems];

    if (lastItem.item !== "") {
      values.push({ idx: uuidv4(), item: "", value: "" });
      props.combineDescriptions(values);
      setRestricted(false);
    } else {
      setRestricted(true);
    }
  };

  const toggleOn = (id) => {
    setShowRemove(id);
  };

  const toggleOff = () => {
    setShowRemove();
  };

  return (
    <>
      <div className="description-update-form">
        {props.description.map(({ item, value, idx }) => (
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
                onChange={(e) => props.labelChange(e, idx)}
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
              {idx === showRemove && (
                <Icon
                  className="remove-old"
                  name="remove"
                  onClick={() => props.removeDescription(idx)}
                />
              )}
            </div>
            <Form.Control
              className="input-field"
              type="text"
              size="sm"
              autoComplete="off"
              value={value}
              onChange={(e) => props.valueChange(e, idx)}
              required
            />
          </Form.Group>
        ))}
        {props.edit && (
          <div
            className={`${
              restricted && "add-restricred-wrapper"
            } add-spec-wrapper`}
            onClick={addNewItem}
          >
            <AddIcon />
          </div>
        )}
      </div>
      {props.description.length === 0 && !props.edit && (
        <span style={{ fontSize: "20px", padding: "0px" }}>
          {" "}
          ' Click change to add bicycle specifications '
        </span>
      )}
      {props.errors.description && (
        <span className="error-text">
          {Object.values(props.errors.description)}
        </span>
      )}
    </>
  );
};
