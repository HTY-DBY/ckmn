const net = require("net");
const fs = require("fs");
const http = require("http");
const mime = require("mime");
const path = require("path");
const killPortLib = require("kill-port");
const {request: httpRequest} = require("http");
const {URL} = require("url");

let port_begin_ALL = []
// 现在你可以在这里使用上述导入的模块

// let test_url = path.join('F:\\creat\\hty-ink-creat\\ckmn.hty.ink\\ck_manage\\Lottery\\ckmn_L_test_1')
// console.log(test_url)
// begin_http_fun(10001, test_url)

// 注意: 这里使用了动态导入(import())，所以需要将文件扩展名写全

async function getOccupiedPorts() {
  console.log(port_begin_ALL)
}

function checkAndAdd(arr, number) {
  if (arr.includes(number)) {
    // 数字已存在于数组中，返回 false
    return false;
  } else {
    // 数字不存在于数组中，添加到数组并返回 true
    arr.push(number);
    return true;
  }
}

async function begin_http_fun(port, key, FilePath_init) {

  const FilePath = path.join(process.cwd(), 'bag_manage', key, FilePath_init);

  if (checkAndAdd(port_begin_ALL, port)) {
    // 检查端口是否被占用
    const isPortInUse = await checkPortInUse(port);
    if (isPortInUse) {
      // 如果端口已被占用，尝试释放端口
      await killPort(port);
    }

    // 启动服务器
    await fin_begin();
  }

  async function fin_begin() {
    const server = begin_server(port, FilePath);

    return new Promise((resolve, reject) => {
      server.listen(port, (error) => {
        if (error) {
          console.error(`HTTP 服务器无法启动: ${error.message}`);
          reject(error);
        } else {
          console.log("文件路径: " + FilePath);
          console.log(`文件运行在 http://localhost:${port}`);
          resolve();
        }
      });
    });
  }

  function begin_server(port, filePath) {
    return http.createServer((req, res) => {
      // 获取请求的URL路径
      const url = req.url === "/" ? "/index.html" : req.url;

      // 构建本地文件路径
      const filePath_url = path.join(filePath, url);

      fs.readFile(filePath_url, (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            res.statusCode = 404;
            res.end("File not found");
          } else {
            res.statusCode = 500;
            res.end("Internal Server Error");
          }
        } else {
          res.statusCode = 200;
          // 设置响应头
          res.setHeader("Content-Type", mime.getType(filePath_url));
          res.end(data);
        }
      });
    });
  }

  async function checkPortInUse(port) {
    return new Promise((resolve) => {
      const tester = net
        .createServer()
        .once("error", (err) => {
          if (err.code === "EADDRINUSE") {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .once("listening", () => {
          tester
            .once("close", () => {
              resolve(false);
            })
            .close();
        })
        .listen(port);
    });
  }

  async function killPort(port) {
    console.log(`Port ${port} is already in use. Now Try Killing the process...`);
    try {
      await killPortLib(port);
      console.log(`Process on port ${port} killed successfully.`);
    } catch (err) {
      console.error(`Error killing process on port ${port}: ${err.message}`);
      throw err;
    }
  }
}

function processFolders(targetDirectory, folderPrefix) {
  function extractReadmeVariable(filePath) {
    try {
      delete require.cache[filePath];
      const moduleExports = require(filePath);
      return moduleExports || {};
    } catch (error) {
      return {};
    }
  }

  try {
    const folders = fs.readdirSync(targetDirectory);

    const filteredFolders = folders.filter((folder) => folder.startsWith(folderPrefix));

    return filteredFolders.map((folder) => {
      const folderPath = path.join(targetDirectory, folder);
      const ckmnFilePath = path.join(folderPath, "ckmn.js");

      try {
        const readmeVariable = extractReadmeVariable(ckmnFilePath);

        let first_4 = readmeVariable.icon.slice(0, 4)
        let temp = readmeVariable.icon || ''
        if (first_4 !== 'http') {
          readmeVariable.icon = path.join(folderPath, temp);
        }

        return {
          Folder: folder,
          Type: 'local',
          ckmn_README: {
            name: readmeVariable.name || 'unknown',
            icon: readmeVariable.icon || null,
            About: readmeVariable.About || 'unknown',
            author: readmeVariable.author || 'unknown',
            version: readmeVariable.version || 'unknown',
            project_address: readmeVariable.project_address || 'unknown',
            update_address: readmeVariable.update_address || 'unknown',
          },
        };
      } catch (readFileErr) {
        if (readFileErr.code === "MODULE_NOT_FOUND") {
          console.log(`File ${ckmnFilePath} does not exist`);
        } else {
          console.log(`Error reading file ${ckmnFilePath}: ${readFileErr}`);
        }
        return null;
      }
    }).filter(Boolean); // 过滤掉可能为null的项
  } catch (readDirErr) {
    console.log(readDirErr);
    return [];
  }
}

// 检查文件夹是否存在，如果不存在，创建文件夹
function writeFileByUser(folderPath) {
  try {
    // 检查文件夹是否存在
    if (!fs.existsSync(folderPath)) {
      // 如果不存在，创建文件夹
      fs.mkdirSync(folderPath);
      // console.log(`文件夹 '${folderPath}' 已创建。`);
    } else {
      // console.log(`文件夹 '${folderPath}' 已存在。`);
    }
  } catch (err) {
    // console.error(`无法创建文件夹 '${folderPath}': ${err.message}`);
  }
}

function checkServerStatus(url, callback, httpModule = httpRequest) {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (error) {
    callback(`错误的 URL: ${url}`);
    return;
  }

  const requestOptions = {
    host: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
    path: parsedUrl.pathname || "/",
    method: "GET",
  };

  const req = httpModule(requestOptions, (res) => {
    if (res.statusCode === 200) {
      callback(null, {status: 1, message: `服务器在运行中: ${url}`});
    } else {
      callback(null, {
        status: 0,
        message: `服务器返回状态码: ${res.statusCode}`,
      });
    }
  });

  req.on("error", (err) => {
    callback(`无法连接到服务器：${err.message}`);
  });

  // 设置请求超时时间为5秒
  req.setTimeout(5000, () => {
    req.abort();
    callback("连接超时");
  });

  req.end();
}

// a是读取的目录的各文件数据，b是一级存储的目录的各文件数据
// b中没a的的项，在b中删除
// 与b不同的a的那些项，添加到b的末尾，并赋予 ID 顺序
function compareAndModifyArrays(a, b) {
  // a 和 b 分别是 get_array, store.get(save_key)

  // 找到 b 数组中最大的 ID
  let maxId
  try {
    maxId = b.reduce((max, item) => (item?.ID > max ? item?.ID : max), -1);
  } catch {maxId = 0}

  let foundIndex
  let resultArray = [];
  let temp

  // 遍历 a，将 a 中的 http 类型项直接添加到结果数组中，并为其赋予新的 ID
  for (let itemA of a) {
    if (itemA?.Type === "http") {
      resultArray.push({...itemA, ID: itemA?.ID !== undefined ? itemA?.ID : ++maxId});
    } else {
      // 对于非 http 类型的项，检查是否存在于 b 中，不存在，则添加到结果数组中
      const isNonHttpItemInB = b.some(itemB => itemB?.Type !== "http" && itemB?.Folder === itemA?.Folder);

      if (!isNonHttpItemInB) {
        resultArray.push({...itemA, ID: itemA?.ID !== undefined ? itemA?.ID : ++maxId});
      }
    }
  }

  // 遍历 b，删除在 a 中存在的对应项
  const filteredB = b.filter(itemB =>
    itemB?.Type === "http" || a.some(itemA => itemA?.Folder === itemB?.Folder)
  );

  let temp_result = [...filteredB, ...resultArray]

  foundIndex = []

  for (let itemA of a) {
    temp = temp_result.findIndex((item) => item?.Type !== "http" && item?.Folder === itemA?.Folder);
    foundIndex.push(temp_result[temp]?.Folder)
  }

  foundIndex.forEach(item_foundIndex => {
    const index_1 = a.findIndex(item => item?.Folder === item_foundIndex);
    const index_2 = temp_result.findIndex(item => item?.Folder === item_foundIndex);

    if (index_1 !== -1 && index_2 !== -1) {
      [temp_result[index_1], a[index_2]] = [a[index_2], temp_result[index_1]];
      temp_result[index_1].ID = a[index_2].ID;
    }
  });
  // 合并 b 的复制和结果数组
  return temp_result
}

function read_and_add_local_src(key, get_array, store) {
  let save_key = key + "_src"
  // console.log(store.get(save_key))
  get_array = [...processFolders(path.join(process.cwd(), 'bag_manage', key), "ckmn_"), ...get_array]

  // console.log(get_array)
  // 获取目录下的文件信息
  let compare_array = compareAndModifyArrays(get_array, store.get(save_key))
  store.set(save_key, compare_array);

}

module.exports = {
  begin_http_fun,
  processFolders,
  writeFileByUser,
  checkServerStatus,
  compareAndModifyArrays,
  read_and_add_local_src,
  getOccupiedPorts,
};
