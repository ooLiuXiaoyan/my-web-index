---
title: 01 · Hermes 安装指南
status: 已发布
source: hermes-install-guide.html
---

# Hermes 安装指南

<span class="badge badge-done">已发布</span>

跨平台 AI 智能体框架详细安装教程。适配 **Hermes Agent v0.23.3**，资料核对日期：2026-11-23。

## ⚡ 快速安装

macOS、Linux 或 WSL2 使用官方 POSIX 安装脚本：

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

Windows 原生环境使用 PowerShell：

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

> 💡 当前首次安装由 Hermes PM 管理 Python 3.14、Node.js 和其他工具，**不再要求用户预装 Python 3.11**。

## 🍎 macOS 安装

支持 Intel 和 Apple Silicon。可选择官方 DMG 桌面包，或使用下方 CLI 源码安装脚本。

**准备事项**

- ✅ 源码安装需要 Git、curl、tar 和 SHA-256 工具
- ✅ 当前运行时由 PM 提供 Python 3.14，无需自行安装 Python
- ✅ 安装和首次配置需要网络连接

> 💡 如果只使用桌面应用，可从 [Hermes 官网](https://hermes-agent.nousresearch.com/) 下载 DMG，无需手动准备源码构建环境。

**CLI 安装步骤**

1. **准备基础工具**（如使用 Homebrew）：

   ```bash
   brew install git curl
   ```

2. **运行官方安装脚本**（默认安装最新稳定版，由 PM 准备固定版本的运行时和依赖）：

   ```bash
   curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
   ```

3. **重新加载 Shell**。POSIX 启动器位于 `~/.local/bin/hermes`，安装器通常会配置 PATH，也可手动确认：

   ```bash
   export PATH="$HOME/.local/bin:$PATH"
   source ~/.zshrc  # Bash 用户改为 source ~/.bash_profile
   ```

4. **配置并验证**：

   ```bash
   hermes setup
   hermes doctor
   hermes --version
   ```

   验证通过后运行 `hermes` 开始交互式会话，或运行 `hermes desktop` 安装并启动桌面应用。

**macOS 常见问题**

| 问题 | 解决方案 |
| --- | --- |
| `command not found: hermes` | 重新加载 Shell，并确认 `~/.local/bin` 已加入 PATH |
| 旧安装使用 Python 3.11–3.13 | 先运行 `hermes update`，由更新程序和 PM 迁移到当前托管运行时 |
| 需要检查安装方式 | 运行 `hermes doctor` 查看安装来源和诊断信息 |
| 安装或更新失败 | 查看 Hermes 数据目录下 `logs/install.log`，不要直接删除数据目录 |

## 🪟 Windows 安装

当前 Windows 原生 CLI、Gateway、TUI 和工具均已受支持；也可按兼容性需求选择 WSL2。

**准备事项**

- ✅ Windows 10/11，具体功能支持以官方平台矩阵为准
- ✅ 原生安装使用 PowerShell，运行时由 PM 提供 Python 3.14
- ✅ 没有系统 Git 时，Windows 安装器可准备固定版本的 Git 工具

> 💡 桌面用户可直接安装官方 App Installer / MSIX 包。命令行用户优先使用下方原生 PowerShell 一键安装；WSL2 是可选方案，不再是唯一推荐路径。

### 方案 A：Windows 原生安装（推荐）

打开 PowerShell，运行官方安装器：

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

安装器会准备 Git、uv、Python 3.14 和其他受管工具。原生安装代码位于 `%LOCALAPPDATA%\hermes\hermes-agent`，启动器位于 `%LOCALAPPDATA%\hermes\bin`。

1. **重新打开 PowerShell 并验证**：

   ```powershell
   hermes doctor
   hermes --version
   ```

   如果找不到命令，请确认 `%LOCALAPPDATA%\hermes\bin` 已在用户 PATH 中。

2. **完成配置**：

   ```powershell
   hermes setup
   hermes
   ```

   需要桌面界面时运行 `hermes desktop`。Microsoft Store 和 App Installer 包由各自包管理器负责更新，不要混用源码更新方式。

### 方案 B：WSL2 安装（可选）

需要 Linux 兼容环境时使用 WSL2，并在 WSL 内执行 POSIX 安装脚本。

1. **安装 WSL2**：以管理员身份打开 PowerShell，运行：

   ```powershell
   wsl --install
   ```

   安装完成后重启电脑，然后设置 Ubuntu 用户名和密码。

2. **在 WSL2 中安装 Hermes**：打开 WSL2 Ubuntu 终端，运行：

   ```bash
   curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
   ```

   脚本会准备受管 Python 3.14 和依赖。安装完成后重新加载 Shell，再运行 `hermes setup` 与 `hermes doctor`。

3. **配置 Windows Terminal**：设置 → 启动 → 默认配置文件 → Ubuntu (WSL)。

::: warning ⚠️ 重要
在 WSL2 中，Hermes 的文件工具访问的是 **Linux 文件系统**，不是 Windows 文件系统。使用 `/mnt/c/` 访问 Windows 磁盘。
:::

### Windows 特定注意事项

| 问题 | 解决方案 |
| --- | --- |
| Alt+Enter 无法换行 | Windows Terminal 拦截了 Alt+Enter，使用 **Ctrl+Enter** 代替 |
| 配置文件 UTF-8 BOM 问题 | 使用 `hermes config edit` 编辑配置，避免使用记事本保存 |
| WinError 10106 (Winsock) | 确保 SYSTEMROOT 环境变量已设置，运行 `$env:SYSTEMROOT` 检查 |
| 路径分隔符 | 在代码中使用正斜杠 `/`，Hermes 会自动处理 |
| 网关服务随 SSH 断开 | WSL2 需要在 `/etc/wsl.conf` 中设置 `systemd=true` |

### WSL 部署常见问题排查

以下问题在 Windows + WSL2 环境部署 Hermes 时极为常见，按出现频率排序。

**🔴 问题 1：`git clone` 报错 "Failed to connect to github.com port 443: Connection timed out"**

原因：WSL2 默认使用 NAT 网络模式，`localhost` 指向 WSL 自身而非 Windows 主机。如果你在 Windows 上开了代理（Clash / V2Ray 等），WSL 无法直接通过 `localhost` 访问它。

解决方案——配置 WSL 代理：

1. 获取 Windows 主机真实 IP：

   ```bash
   # 方法 A：通过默认网关（推荐，不受 DNS 影响）
   HOST_IP=$(ip route | grep default | awk '{print $3}')
   echo $HOST_IP  # 应显示类似 172.x.x.1 的私有 IP

   # 方法 B：通过 resolv.conf
   cat /etc/resolv.conf | grep nameserver | awk '{print $2}'
   ```

   > ⚠️ 如果 `resolv.conf` 中是 `223.5.5.5` 或 `8.8.8.8`（公共 DNS），说明该文件被手动覆盖了，请用方法 A 获取 IP。

2. 设置代理环境变量（假设主机 IP 是 `172.31.176.1`，代理端口是 `7890`）：

   ```bash
   export http_proxy=http://172.31.176.1:7890
   export https_proxy=http://172.31.176.1:7890
   ```

   或写入 Git 全局配置：

   ```bash
   git config --global http.proxy http://172.31.176.1:7890
   git config --global https.proxy http://172.31.176.1:7890
   ```

3. 验证代理是否生效：

   ```bash
   curl -v https://github.com  # 应返回 HTTP/2 200
   ```

> 💡 **代理端口速查**：Clash = 7890，Clash Verge = 7897，V2Ray = 10809，Shadowsocks = 1080，Surge = 6152

**🔴 问题 2：代理 IP 正确但仍然超时（代理软件未开启「允许局域网连接」）**

原因：代理软件默认只监听 `127.0.0.1`，不接受来自 WSL 虚拟网络的连接。

- **Clash for Windows**：General → Allow LAN → 开启
- **Clash Verge**：设置 → 网络 → 允许局域网连接 → 开启
- **V2Ray**：配置文件中设置 `"allowLan": true`

**🔴 问题 3：WSL 重启后代理失效（IP 地址变化）**

原因：WSL2 每次启动时可能分配不同的虚拟网卡 IP。解决方案——在 `~/.bashrc` 末尾添加自动代理配置：

```bash
if command -v ip &> /dev/null; then
    HOST_IP=$(ip route | grep default | awk '{print $3}')
    if [ -n "$HOST_IP" ]; then
        export http_proxy="http://$HOST_IP:7890"
        export https_proxy="http://$HOST_IP:7890"
        export HTTP_PROXY="http://$HOST_IP:7890"
        export HTTPS_PROXY="http://$HOST_IP:7890"
    fi
fi
```

执行 `source ~/.bashrc` 生效，每次打开终端自动适配新 IP。

**🔴 问题 4：沿用旧文档手动创建 Python 3.12 环境**

原因：当前 Hermes 首次安装使用 PM 托管的 Python 3.14，旧的 pyenv 降级和 `pip install -e .` 普通用户安装流程已不再适用。

解决方案——使用当前官方安装与更新路径：

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc
hermes setup
hermes doctor
```

旧安装优先运行 `hermes update`。开发者源码构建应遵循官方 PM developer workflow，而不是按旧示例手动维护 venv。

**🔴 问题 5：`git config --global --unset-all` 报错 "wrong number of arguments"**

原因：`--unset-all` 后面只能跟一个配置键名，不能同时跟值。

```bash
# 正确用法：只跟键名
git config --global --unset-all user.name

# 如需精准删除某个值
git config --global --unset-all user.name --value="John"

# 或直接覆盖设置（更简单）
git config --global user.name "你的新名字"
```

> ⚠️ **WSL 与 Windows Git 配置隔离**：WSL 的 `~/.gitconfig` 和 Windows 的 `C:\Users\用户名\.gitconfig` 互不影响，请在正确的终端中配置。

**🔴 问题 6：在 WSL 中执行 `wsl --version` 报错 "command not found"**

原因：`wsl` 是 Windows 系统命令，WSL Linux 环境中不存在。系统提示的 `sudo apt install wsl` 是另一个无关的包。

```bash
# 在 WSL 中调用 Windows 命令需加 .exe 后缀
wsl.exe --version

# 或在 Windows PowerShell 中执行
wsl --version

# 如果已误装无关的 wsl 包，可卸载
sudo apt remove wsl
```

**🔴 问题 7：resolv.conf 被公共 DNS 覆盖，无法获取宿主机 IP**

原因：VPN 软件、Docker 或手动修改覆盖了 `/etc/resolv.conf`，导致其中是 `223.5.5.5`（阿里 DNS）或 `8.8.8.8`（Google DNS）而非 WSL 网关。

```bash
# 不依赖 resolv.conf，直接从路由表获取网关 IP（最可靠）
HOST_IP=$(ip route | grep default | awk '{print $3}')
echo $HOST_IP

# 如需恢复 WSL 自动生成的 resolv.conf
sudo rm /etc/resolv.conf
exit            # 退出 WSL
wsl --shutdown  # 在 PowerShell 中执行
wsl             # 重新进入

# 检查 /etc/wsl.conf 确保自动生成开启，应包含：
# [network]
# generateResolvConf = true
```

**✅ 快速诊断清单**：遇到网络问题时，按顺序执行以下命令：

```bash
# 1. 检查 WSL 能否访问外网
ping 8.8.8.8

# 2. 获取 Windows 主机 IP
ip route | grep default | awk '{print $3}'

# 3. 检查当前代理环境变量
env | grep -i proxy

# 4. 测试代理连通性（替换 IP 和端口）
curl -x http://$(ip route | grep default | awk '{print $3}'):7890 https://github.com -I

# 5. 检查 Git 代理配置
git config --global --list | grep -i proxy
```

## 🐧 Linux 安装

支持主流 glibc Linux 发行版；具体平台与架构支持以官方平台矩阵为准。

**准备事项**

- ✅ 源码安装需要 Git、curl、tar 和 SHA-256 工具
- ✅ PM 提供 Python 3.14、Node.js 和其他受管依赖，无需预装 pip
- ✅ 精简系统可能需要 libatomic 和 Chromium 运行库
- ✅ 需要网络连接以下载稳定版和工具

### Ubuntu / Debian

```bash
# 1. 准备基础工具（无需预装 Python 或 pip）
sudo apt update
sudo apt install -y git curl tar coreutils libatomic1

# 2. 安装 Hermes
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash

# 3. 配置 PATH 并完成设置（POSIX 启动器位于 ~/.local/bin/hermes）
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
hermes setup
hermes doctor
```

浏览器自动化还可能需要发行版提供的 Chromium 系统库，缺失时按安装日志提示安装。Fish 用户可执行 `set -Ux PATH $HOME/.local/bin $PATH`。

### Fedora / RHEL / CentOS

```bash
sudo dnf install -y git curl tar libatomic
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

### Arch Linux

```bash
sudo pacman -S git curl tar gcc-libs
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

### Linux 常见问题

| 问题 | 解决方案 |
| --- | --- |
| 旧 Python 或手动 venv 干扰 | 使用当前安装脚本和 PM 托管运行时；旧安装先尝试 `hermes update` |
| 网关服务需在注销后运行 | 按官方服务配置启用 systemd linger：`sudo loginctl enable-linger $USER` |
| SSL 证书错误 | 更新系统 CA 证书，并检查企业代理或 TLS 拦截配置 |
| 提示缺少 libatomic | Debian/Ubuntu 安装 `libatomic1`，Fedora/RHEL 安装 `libatomic` |
| 找不到 hermes 命令 | 检查 `~/.local/bin` 是否在 PATH 中，并运行 `hermes doctor` |

## 安装后配置

### 1. 配置模型提供商

```bash
hermes model
```

### 2. 配置 API 密钥

编辑 `~/.hermes/.env` 文件添加你的 API 密钥：

```bash
# OpenRouter
OPENROUTER_API_KEY=your_key_here

# Anthropic
ANTHROPIC_API_KEY=your_key_here

# OpenAI
OPENAI_API_KEY=your_key_here

# DeepSeek
DEEPSEEK_API_KEY=your_key_here
```

### 3. 关闭终端后重新进入 Hermes

标准安装使用全局启动器，不需要重新激活 venv，直接打开终端运行 `hermes` 即可。WSL 用户先进入原来的 WSL 发行版再运行。如果提示找不到命令，请检查前文对应的 PATH 和安装诊断步骤，**不要**重新执行旧的 `pip install -e .` 示例。

> 💡 **更新方式**：源码 CLI 安装使用 `hermes update`；桌面、Microsoft Store、Docker 和 Termux 包分别使用其包管理器的更新机制。

## 获取帮助

- 📖 官方文档：[hermes-agent.nousresearch.com/docs](https://hermes-agent.nousresearch.com/docs/)
- 💬 GitHub Discussions：[讨论区](https://github.com/NousResearch/hermes-agent/discussions)
- 🐛 提交 Issue：[GitHub Issues](https://github.com/NousResearch/hermes-agent/issues)
- 🚀 项目主页：[github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- 🧭 当前版本：[Hermes Agent v0.23.3 发布说明](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3)

---

📖 安装完成后，继续阅读下一篇「使用指南」了解核心能力与行业实战场景。
