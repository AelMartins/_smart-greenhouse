import RNFS from 'react-native-fs';



const Pages = {}

const initPages = async () => {
    const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);

    files
        .filter(item => item !== 'index.jsx')
        .forEach(file => {
            console.log(file)
            // const page = require(`./${file}`)
            const page = require(`./SignIn`)
            // const page = require(path.join(__dirname, file))

            Pages[file.replace('.jsx', '')] = page
        })

    return Pages
}

export default Pages ? Pages : initPages();