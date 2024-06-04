/*************************************************************************************************************************************/
/*                                                                                                                                   */
/*                                           Here is the FileSystem of the extension                                                 */
/*                                                                                                                                   */
/*************************************************************************************************************************************/



/*********************************************************About modules***************************************************************/
export { FileSystem };

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as jsonstream from 'jsonstream';


class FileSystem {

    /*************************************************Static member attribute*********************************************************/
    static fileRegex = /\.vrd\.json$/;//游戏内容json文件正则表达式

    static workspace_folder:string | undefined;//工作区文件夹路径
    static game_folder:string | boolean;//game文件夹路径
    static gamecontent_json_path:string[] | boolean;//记录游戏内容json文件的路径

    static current_selected_json:string;//当前所处的json文件
    static current_selected_chapter:string;//当前所处的章
    static current_selected_section:string;//当前所处的节

    /***********************************************Static initialization method******************************************************/

    static initialize() {//初始化获取用户工作区文件相关信息
        this.workspace_folder = this.detectWorkspaceFolder();
        this.game_folder = this.detectGameFolder();
        this.gamecontent_json_path = this.detectGameContentJson();
    }

    /**************************************************Static member function*********************************************************/

    static readUserFilesStructrue(): void {//读取用户文件并存于一定的文件存储结构中,包括renpy script文件，资源文件等

    }








    

    static setCurrentSelectedJson():void{//设置当前所处的json文件

    }

    static setCurrentSelectedChapter():void{//设置当前所处的章

    }

    static setCurrentSelectedSection():void{//设置当前所处的节

    }








    






    static getGameContentJsonList():string[]{//获取游戏内容json文件列表
        const fileRegex = /[^\\]+$/;//游戏内容json文件正则表达式
        let filteredStrings:string[]=[];
        if(Array.isArray(this.gamecontent_json_path)){
            for(let path of this.gamecontent_json_path){
                let match = path.match(fileRegex);
                if(match){
                    filteredStrings.push(match[0]);
                }
            }
        }
        return filteredStrings;
    }

    //待修改
    static createGameContentJson(): void {//在game文件夹下创建记录游戏内容的json文件
        if(typeof this.game_folder === 'string'){
            let filePath = path.join(this.game_folder,'gamecontent.vrd.json');
            try {
                fs.writeFileSync(filePath, '{}');
                console.log('File created successfully');
            } catch (err) {
                console.error('Error creating file:', err);
            }
        }
    }

    static deleteGameContentJson():void{//删除指定的游戏内容json文件

    }





    static async getChapterList(json_path: string): Promise<string[]> {//获取章列表
        const chapterNames: string[] = [];
      
        return new Promise((resolve, reject) => {
            if(typeof this.game_folder==='string'){
                const readStream = fs.createReadStream(path.join(this.game_folder,json_path));
                const jsonStream = jsonstream.parse('chapter.*.chaptername');
      
                readStream.pipe(jsonStream);
            
                jsonStream.on('data', (chaptername: string) => {
                  chapterNames.push(chaptername);
                });
            
                jsonStream.on('end', () => {
                  console.log('File reading and parsing completed.');
                  resolve(chapterNames); // 解析完成后返回结果
                });
            
                jsonStream.on('error', (err) => {
                  console.error('Error reading or parsing file:', err);
                  reject(err); // 处理错误
                });
            }

        });
    }

    static createChapter():void{//在当前json文件下新建一个章

    }

    static deleteChapter():void{//删除当前json文件下的一个章

    }

    static changeChapterOrder():void{//改变章顺序

    }
    






    static getSectionList(){//获取节列表

    }

    static createSection():void{//在当前章下新建一个节

    }

    static deleteSection():void{//删除当前章下的一个节

    }

    static changeSectionOrder():void{//改变节顺序

    }







    static getSentenceList(){//获取当前节下的句子列表

    }

    static getSentenceContent(): void {//读取当前节下选定sentence的内容，参数：选定的sentence

    }














    

    private static detectGameFolder(): boolean | string {//检测工作区是否存在game文件夹，存在返回路径，不存在返回false
        if (typeof this.workspace_folder === 'string') {
            try {
                const files = fs.readdirSync(this.workspace_folder);
                for (let file of files) {
                    if (file === 'game') {
                        return path.join(this.workspace_folder, file);
                    }
                }
            } catch (err) {
                throw err;
            }
        }
        return false;
    }

    private static detectWorkspaceFolder() {//获取用户工作区文件夹路径，没有打开工作区则设置一个标志变量为0（暂时没写设置）
        let temp_workspace = vscode.workspace.workspaceFolders;
        if (temp_workspace && temp_workspace.length > 0) {
            const workspaceFolder = temp_workspace[0].uri.fsPath;
            return workspaceFolder;
        } else {
            vscode.window.showInformationMessage('No workspace folder open');
            return undefined;
        }
    }

    private static detectGameContentJson(): boolean | string[] {//检查用户工作区是否存在游戏内容json文件，存在则返回路径（可以是一个路径，也可以是多个路径返回数组），不存在则返回false
        if (typeof this.game_folder === 'string') {
            try {
                const files = fs.readdirSync(this.game_folder);
                let gamejcontent_json = files.filter(file => this.fileRegex.test(file));
                if (gamejcontent_json.length > 0) {
                    return gamejcontent_json.map(file => path.join(this.game_folder as string, file));
                }
            } catch (err) {
                throw err;
            }
        }
        return false;
    }









    /**
     * 从某个HTML文件读取能被Webview加载的HTML内容
     * @param {*} context 上下文
     * @param {*} templatePath 相对于插件根目录的html文件相对路径
     */
    static getWebViewContent(context:vscode.ExtensionContext, templatePath:string) {
        const resourcePath = path.join(context.extensionPath, templatePath);
        const dirPath = path.dirname(resourcePath);
        let html = fs.readFileSync(resourcePath, 'utf-8');
        // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
        html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
            return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        });
        return html;
    }









    /**************************************************Static member object***********************************************************/
    
    GameContentChapter: object = {

    };
}