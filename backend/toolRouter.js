export function routeCommand(command) {
  const text = command.trim();

  if (!text) {
    return {
      success: false,
      error: "Command cannot be empty."
    };
  }

  // Phase 0 stub.
  // Real agents will be added in later phases.

  return {
    success: true,
    status: "stub",
    message: "Command received. Tool routing is not implemented yet.",
    command: text
  };
}