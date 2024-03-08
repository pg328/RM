import { Switch } from "@headlessui/react";
import React from "react";

type IllegalFellingCheckboxProps = {
  update(e: { isIllegalFelling: boolean }): void;
  isIllegalFelling: boolean;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const IllegalFellingCheckbox: React.FC<IllegalFellingCheckboxProps> = ({
  update,
  isIllegalFelling,
}) => {
  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex flex-grow flex-col">
        <Switch.Label
          as="span"
          className="text-sm font-medium leading-6 text-gray-900"
          passive
        >
          Illegal Felling
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          Check this if this tree was found to be an illegal felling
        </Switch.Description>
      </span>
      <Switch
        checked={isIllegalFelling}
        onChange={(e) => {
          update({ isIllegalFelling: e });
        }}
        className={classNames(
          isIllegalFelling ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
        )}
      >
        <span className="sr-only">Illegal Felling</span>
        <span
          aria-hidden="true"
          className={classNames(
            isIllegalFelling ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
    </Switch.Group>
  );
};
