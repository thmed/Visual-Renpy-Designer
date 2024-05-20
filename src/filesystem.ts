export {FileSystem};

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

class FileSystem {
    
    /*Static member attribute*/
    static workspace_folder = this.getWorkspace();//工作区文件夹路径
    static gamecontent_json_exit:Boolean;//记录工作区game文件下是否存在游戏内容json文件
    static gamecontent_json_path:string | string[];//记录游戏内容json文件的路径

    /*Static member function*/
    static readUserFilesStructrue():void{//读取用户文件并存于一定的文件存储结构中,包括renpy script文件，资源文件等

    }

    createGameContentJson():void{//在game文件夹下创建记录游戏内容的json文件

    }

    static readGameContentSentence():void{//读取选定sentence的内容，参数：选定的sentence

    }
    
    static detectGameContentJson():boolean | string | string[]{//检查用户工作区是否存在游戏内容json文件，存在则返回路径（可以是一个路径，也可以是多个路径返回数组），不存在则返回false
        return false;
    }

    static getWorkspace(){//获取用户工作区文件夹路径，没有打开工作区则设置一个标志变量为0（暂时没写设置）
        let temp_workspace = vscode.workspace.workspaceFolders;
        if (temp_workspace && temp_workspace.length > 0) {
            const workspaceFolder = temp_workspace[0].uri.fsPath;
            return workspaceFolder;
        } else {
            vscode.window.showInformationMessage('No workspace folder open');
            return undefined;
        }
    }

    /*Static member object*/
    GameContentChapter:object = {

    };
}