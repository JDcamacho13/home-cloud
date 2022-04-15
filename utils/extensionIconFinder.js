const extensions = {
    jpg: 'ImageIcon',
    png: 'ImageIcon',
    jpeg: 'ImageIcon',
    mov: 'VideoIcon',
    mkv: 'VideoIcon',
    mp4: 'VideoIcon',
    wmv: 'VideoIcon',
    flv: 'VideoIcon',
    rar: 'CompressIcon',
    zip: 'CompressIcon',
    mp3: 'SoundIcon',
    wav: 'SoundIcon',
    ogg: 'SoundIcon',
    iso: 'IsoIcon',
    pdf: 'PdfIcon',
    xlsx: 'ExcelIcon',
    docx: 'WordIcon',
    pptx: 'PowerPointIcon',
}

export const extensionIconFinder = (ext) => {
    if (ext in extensions) {
        return extensions[ext]
    } else {
        return 'FileIcon'
    }
}