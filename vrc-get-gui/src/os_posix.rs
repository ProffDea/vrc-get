//! OS-specific functionality.

use std::ffi::OsStr;
use std::fs::OpenOptions;
use std::io;
use std::os::fd::AsRawFd;
use std::path::Path;
use std::sync::OnceLock;

use nix::libc::{c_short, flock, F_UNLCK};
use tokio::process::Command;

pub(crate) async fn start_command(_: &OsStr, path: &OsStr, args: &[&OsStr]) -> std::io::Result<()> {
    Command::new(path).args(args).spawn()?;
    Ok(())
}

pub(crate) fn is_locked(path: &Path) -> io::Result<bool> {
    let mut lock = flock {
        l_start: 0,
        l_len: 0,
        l_pid: 0,
        l_type: F_UNLCK as c_short, // macOS denies l_type: 0
        l_whence: 0,
    };
    let file = OpenOptions::new().read(true).open(path)?;

    nix::fcntl::fcntl(file.as_raw_fd(), nix::fcntl::F_GETLK(&mut lock))?;

    Ok(lock.l_type != F_UNLCK as c_short)
}

#[cfg(target_os = "macos")]
#[path = "os_macos.rs"]
mod os_more;

#[cfg(target_os = "linux")]
#[path = "os_linux.rs"]
mod os_more;

pub fn os_info() -> &'static str {
    static OS_INFO: OnceLock<String> = OnceLock::new();
    OS_INFO.get_or_init(os_more::compute_os_info)
}
