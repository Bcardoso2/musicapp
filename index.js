const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();  // Certifique-se de que dotenv está configurado corretamente

const app = express();
const port = process.env.PORT || 3000;

// Configurar Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(express.json());

// Endpoint para listar todas as músicas
app.get('/songs', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('songs')
            .select('*');

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Teste inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('API de Streaming de Música funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
