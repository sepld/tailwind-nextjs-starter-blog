import net from 'net';

export async function queryWhois(server: any): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // 创建一个 socket 客户端
    const client = new net.Socket();

    console.error("server:  ", server)
    // 定义 WHOIS 服务器的主机和端口
    const WHOIS_SERVER = server.host;
    const WHOIS_PORT = server.port !== undefined ? server.port : 43;

    // 连接到 WHOIS 服务器
    client.connect(WHOIS_PORT, WHOIS_SERVER, () => {
      // 发送查询请求
      client.write(server.query.replace('$addr', server.domain));
    });

    // 监听来自 WHOIS 服务器的数据
    let responseData = '';
    client.on('data', (data: Buffer) => {
      responseData += data.toString();
    });

    // 监听连接关闭事件
    client.on('close', () => {
      // 关闭客户端连接
      client.destroy();
      // 解析 WHOIS 数据后，将结果传递给调用者
      resolve(responseData);
    });

    // 监听连接错误事件
    client.on('error', (err: Error) => {
      console.error('Error:', err.message);
      // 如果发生错误，将错误传递给调用者
      reject(err);
    });
  });
}
