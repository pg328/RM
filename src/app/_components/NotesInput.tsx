import React from "react";

type NotesInputProps = {
  update(e: { notes: string }): void;
  notes: string;
};

export const NotesInput: React.FC<NotesInputProps> = ({ update, notes }) => {
  return (
    <div>
      <label
        htmlFor="notes"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Notes
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="notes"
          id="notes"
          className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => update({ notes: e.target.value })}
          value={notes}
        />
      </div>
    </div>
  );
};
