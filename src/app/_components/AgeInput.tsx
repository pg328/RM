import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

type AgeInputProps = {
  update(e: { age: string }): void;
  age: string;
  errorMessage?: string;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const AgeInput: React.FC<AgeInputProps> = ({
  update,
  age,
  errorMessage,
}) => {
  return (
    <div>
      <label
        htmlFor="age"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Age
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="age"
          id="age"
          className={classNames(
            !!errorMessage &&
              "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
            "block w-full rounded-md border-0 px-1.5 py-1.5 pr-10 text-black ring-1 ring-inset   focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
          )}
          placeholder="Age of Tree"
          onChange={(e) => update({ age: e.target.value })}
          value={age}
          aria-invalid={!!errorMessage}
        />
        {!!errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {!!errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="age-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
