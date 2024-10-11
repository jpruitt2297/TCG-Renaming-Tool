document.getElementById('generateBtn').addEventListener('click', async () => {
    const meshFile = document.getElementById('mesh').files[0];
    const textureFile = document.getElementById('texture').files[0];
    const iconFile = document.getElementById('icon').files[0];
    const nameFile = document.getElementById('name').files[0];
    const modType = document.getElementById('modSelect').value;

    if (!meshFile || !textureFile || !iconFile || !nameFile || !modType) {
        alert('Please select all files and a mod type.');
        return;
    }

    const zip = new JSZip();
    const modNames = {
        Pigni: { mesh: 'PiggyA_Mesh.obj', texture: 'T_PiggyA.png', icon: 'Icon_PiggyA.png', name: 'Pigni Plushie_NAME.txt' },
        Nanomite: { mesh: 'GolemA_Mesh.obj', texture: 'T_GolemA.png', icon: 'Icon_GolemA.png', name: 'Nanomite Plushie_NAME.txt' },
        Ministar: { mesh: 'StarfishA_Mesh.obj', texture: 'T_StarfishA.png', icon: 'Icon_StarfishA.png', name: 'Minstar Plushie_NAME.txt' },
        Nocti: { mesh: 'BatA_Mesh.obj', texture: 'T_BatA.png', icon: 'Icon_BatA.png', name: 'Nocti Plushie_NAME.txt' },
        Blazoar: { mesh: 'PiggyD_Mesh.obj', texture: 'T_PiggyD.png', icon: 'Icon_Toy_PiggyD.png', name: 'Blazoar Plushie_NAME.txt' },
        Kingstar: { mesh: 'StarfishD_Mesh.obj', texture: 'T_StarfishD.png', icon: 'Icon_Toy_StarfishD.png', name: 'Kingstar Plushie_NAME.txt' },
        Bonfiox: { mesh: 'FoxB_Mesh.obj', texture: 'T_FoxB.png', icon: 'Icon_Toy_FoxB.png', name: 'Bonfiox Plushie_NAME.txt' },
        ToonZ: { mesh: 'ToonZ_Plushie.obj', texture: 'T_ToonZPlushie.png', icon: 'Icon_Toy_ToonZ.png', name: 'ToonZ Plushie_NAME.txt' },
    };

    const selectedNames = modNames[modType];

    // Create directories and add files to the zip
    const objectsMesh = zip.folder('BepinEx/plugins/TextureReplacer/objects_meshes');
    objectsMesh.file(selectedNames.mesh, await readFile(meshFile));

    const objectsTextures = zip.folder('BepinEx/plugins/TextureReplacer/objects_textures');
    objectsTextures.file(selectedNames.texture, await readFile(textureFile));
    objectsTextures.file(selectedNames.icon, await readFile(iconFile));
    
    const objectsData = zip.folder('BepinEx/plugins/TextureReplacer/objects_data/figurines');
    objectsData.file(selectedNames.name, await readFile(nameFile));

    // Generate the zip file and trigger download
    zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'mod.zip');
    }).catch(err => {
        console.error('Error generating zip file:', err);
        alert('Error generating the zip file. Check console for details.');
    });
});

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

