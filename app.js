const fs = require('node:fs/promises')
const path = require("node:path");

const worker = async () => {

    const folderPath = path.join(__dirname, 'folder');

    const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
    const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];


    try {
        await fs.mkdir(folderPath, {recursive: true});

        for (const folder of folders) {
            await fs.mkdir(path.join(folderPath, folder), {recursive: true});
        }

        for (const file of files) {
            await fs.writeFile(path.join(folderPath, file), 'Hello okten');
        }

        const dirItems = await fs.readdir(folderPath, {withFileTypes: true});

        for (const item of dirItems) {

            if (item.isFile()) {
                console.log(`FILE ${item.name}`);
            } else if (item.isDirectory()) {
                console.log(`DIR: ${item.name}`);
            }

        }

    } catch (e) {
        console.log(e.message);
    }
}

worker().then();