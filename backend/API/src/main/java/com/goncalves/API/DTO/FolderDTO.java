package com.goncalves.API.DTO;

import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.folder.Folder;

import java.util.List;

public record FolderDTO(String idFolder,String folderName) {

    public FolderDTO (Folder folder){
        this(folder.getIdFolder(), folder.getFolderName());
    }
}
