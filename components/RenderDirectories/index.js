import Directory from 'components/Directory'
import { memo } from 'react'

const RenderDirectories = ({ directories, urlPath  }) => {
    return (
        <>
            {
                directories.map(directory => (
                    <Directory name={directory} url={urlPath} key={directory} />
                ))
            }        
        </>

    )
}

export default memo(RenderDirectories)