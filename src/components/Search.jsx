import { useEffect, useState } from "react"

const Search = () => {

    const [searching, setSearching] = useState(false)
    const [searchText, setSearchText] = useState('')

    const searchDict = [
        'React',
        'JavaScript',
        'Java',
        'Python',
        'Express',
        'Dart',
        'Flutter'
    ]

    const [showableList, setShowableList] = useState(searchDict)

    const max = (num1, num2) => {
        return num1 > num2 ? num1 : num2
    }

    const matches = (str1, str2) => {
        str1 = str1.toLowerCase()
        str2 = str2.toLowerCase()
        let mat = []
        for (let i = 0; i <= str1.length; i++) {
            mat.push(new Array(str2.length + 1).fill(0))
        }
        for (let i = str1.length - 1; i >= 0; i--) {
            for (let j = str2.length - 1; j >= 0; j--) {
                if (str1[i] == str2[j]) {
                    mat[i][j] = 1 + mat[i + 1][j + 1]
                } else {
                    mat[i][j] = max(mat[i + 1][j], mat[i][j + 1])
                }
            }
        }
        return (mat[0][0] >= str1.length);
    }
    
    useEffect(() => {
        const id = setTimeout(() => {
            if (searchText.length === 0) {
                setShowableList([...searchDict])
            } else {
                let newShowableList = []
                searchDict?.map((item) => {
                    if (matches(searchText, item)) {
                        newShowableList.push(item)
                    }
                })
                console.log('call')
                setShowableList([...newShowableList])
            }
        }, 600)

        return () => {
            clearTimeout(id)
        }
    }, [searchText])

    return (
        <div
            className="absolute w-screen h-screen bg-[#181818] p-2 flex justify-center"
        >
            <div 
                className="w-full h-fit flex justify-center items-center flex-col"
            >
                <input
                    className="rounded-t-sm outline-none border-gray-500 py-2 px-3 w-4/5 bg-[#4d4d4d]  text-white text-xl"
                    type="text"
                    onFocus={() => setSearching(true)}
                    onChangeCapture={(e) => setSearchText(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'backspace') {
                            str = e.target.value
                            e.target.value = str.substring(0, str.length - 1)
                            handleSearchTextChange(e.target.value)
                        }
                    }}
                />
                {
                    (searching) &&
                    <div
                        className="rounded-b-sm w-4/5 h-fit bg-[#a8a8a8]"
                    >
                        {
                            showableList.map((item, index) => {
                                return (
                                    <div
                                        className={`w-full p-2 text-left text-xl ${(index < showableList.length - 1) && 'border-b-red-500'}`}
                                        key={index}
                                    >
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Search