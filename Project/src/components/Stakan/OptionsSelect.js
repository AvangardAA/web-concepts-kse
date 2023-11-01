export default function OptionsSelect({label, options, setSelectedInput, selectedInput, disabled}) {

    const handleChange = (event) => {
        const selectedItem = event.target.value

        if (selectedInput.some(item => item.label === label)) {
            setSelectedInput([
                ...selectedInput.filter(elem => elem.label !== label),
                {
                    label: label,
                    value: selectedItem
                }
            ])
        }
        else {

            setSelectedInput([
                ...selectedInput,
                {
                    label: label,
                    value: selectedItem
                }
            ]);
        }
    };

    return (

        <div className="mx-2 my-6">
            <label
                htmlFor="location"
                className="text-center mb-4 block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <select
                id="location"
                name={label}
                onChange={handleChange}
                className="block w-48 rounded-md border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                disabled={disabled}
            >
                {
                    options.map((option) => {
                        return <option key={option.name}>{option.name}</option>
                    })
                }
            </select>
        </div>
    )
}
