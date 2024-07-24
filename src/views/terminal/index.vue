<template>
  <div ref="terminal" class="terminal-container"></div>
</template>

<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export default {
  name: 'terminal',
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    this.term = new Terminal();
    this.fitAddon = new FitAddon();
    this.term.loadAddon(this.fitAddon);
    this.term.open(this.$refs.terminal);
    this.fitAddon.fit();
    this.term.write('Welcome to the xterm.js terminal!\r\n');

    // Connect to backend WebSocket
    this.socket = new WebSocket('ws://localhost:3000');
    this.socket.onmessage = (event) => {
      this.term.write(event.data);
    };

    // Listen for connection errors
    this.socket.onerror = () => {
      this.term.write('Connection failed. Please try again later.\r\n');
    };

    this.socket.onclose = () => {
      this.term.write('Disconnected from server.\r\n');
    };

    this.term.onData((data) => {
      this.socket.send(data);
    });

    window.addEventListener('resize', this.fit);
  },
  beforeDestroy() {
    this.term.dispose();
    window.removeEventListener('resize', this.fit);
  },
  methods: {
    fit() {
      if (this.fitAddon) {
        this.fitAddon.fit();
      }
    }
  }
};
</script>

<style scoped>
.terminal-container {
  width: 100%;
  height: 100vh;
}
</style>
