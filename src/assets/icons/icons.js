import React from "react";

/**
 * Componente EnginePower - Ícone de Motor Automotivo
 *
 * @param {string} className - Classes CSS para estilização (opcional)
 * @param {number} width - Largura do ícone (padrão: 512)
 * @param {number} height - Altura do ícone (padrão: 512)
 * @param {object} props - Outras propriedades SVG
 */
export const EnginePower = ({
  className = "",
  width = 512,
  height = 512,
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Engine Power Icon"
      role="img"
      {...props}
    >
      <title>Engine Power</title>
      <desc>Created with imagetracer.js version 1.2.6</desc>

      {/* Corpo principal do motor */}
      <path
        fill="none"
        stroke="rgb(0,0,0)"
        strokeWidth="1"
        opacity="1"
        d="M 124.5 37 Q 136.9 37.1 144.5 42 L 199 82.5 L 200 86.5 L 199 89.5 L 186 103.5 L 237.5 155 L 274.5 155 L 326 102.5 L 313 89.5 L 312 85.5 L 315.5 80 L 365.5 43 L 377.5 38 L 387.5 37 L 399.5 40 L 406.5 44 L 504 141.5 Q 509.2 147.4 511 156.5 L 511 171.5 L 503 187.5 L 467.5 235 L 462.5 237 L 458.5 235 L 445.5 223 L 437 232.5 Q 451.1 243.9 459 261.5 L 465 280.5 L 466 302.5 L 461 324.5 L 450.5 343 L 444.5 344 L 441 341.5 L 440 334.5 Q 446.7 325.7 450 313.5 L 452 302.5 L 452 287.5 Q 447 257.5 427.5 242 L 416 252.5 Q 414.9 255.8 417.5 255 Q 426.8 262.7 432 274.5 L 436 289.5 L 436 301.5 Q 432.2 322.2 419.5 334 L 404 344.5 Q 403.5 355 399 361.5 L 402.5 362 L 426.5 351 L 432 355.5 L 433 358.5 L 428.5 365 Q 418.2 372.2 404.5 376 L 395.5 378 L 387.5 378 Q 377 391 357 393 L 357 456.5 Q 354.9 466.4 347.5 471 Q 342.8 474.8 334.5 475 L 326.5 473 L 319 467.5 L 315 460 L 303.5 460 L 302 461.5 Q 300.4 468.4 294.5 471 L 288.5 474 L 281.5 475 L 273.5 473 L 264 464.5 L 261.5 460 L 250.5 460 L 249 461.5 Q 247.4 468.4 241.5 471 Q 236.8 474.8 228.5 475 Q 216.5 473 211 464.5 L 208.5 460 L 197.5 460 L 197 461.5 L 191.5 469 Q 186.1 474.6 175.5 475 Q 164.2 473.3 159 465.5 L 155 456.5 L 155 425 Q 139.9 420.4 130 409.5 Q 121.9 401.1 117 389.5 L 114 377 Q 83 370.8 66 349.5 Q 54.6 336.9 49 318.5 L 46 303.5 L 46 287.5 L 49 272.5 L 56 255.5 Q 63.8 241.8 75 231.5 L 65.5 223 L 53.5 235 L 48.5 237 L 43 233.5 L 5 181.5 L 1 171.5 L 1 156.5 Q 2.9 147.4 8 141.5 L 67.5 82 Q 75.5 80.5 77 85.5 L 77 91.5 L 19 149.5 Q 13 155.5 15 169.5 L 18 176.5 L 30.5 193 L 156 68.5 L 154.5 66 L 139.5 55 L 133.5 52 L 125.5 51 L 115.5 54 L 94.5 74 L 89.5 74 L 86 71.5 L 85 64.5 L 105.5 44 L 112.5 40 L 124.5 37 Z"
      />

      {/* Componentes internos do motor - Direita */}
      <path
        fill="none"
        stroke="rgb(0,0,0)"
        strokeWidth="1"
        opacity="1"
        d="M 344.5 318 Q 353.4 316.6 358.5 319 L 368 326.5 L 372 335.5 L 372 344.5 Q 369.5 353.5 362.5 358 L 353.5 362 L 346.5 362 Q 336.3 359.3 331 351.5 L 328 343.5 L 328 335.5 Q 330.5 327 336.5 322 L 344.5 318 Z M 347 332 L 342 337 L 343 345 L 348 348 L 355 347 Q 359 345 358 337 Q 356 330 347 332 Z"
      />

      {/* Componentes internos do motor - Esquerda */}
      <path
        fill="none"
        stroke="rgb(0,0,0)"
        strokeWidth="1"
        opacity="1"
        d="M 170.5 344 Q 179.4 342.6 184.5 345 L 194 352.5 L 198 361.5 L 198 369.5 Q 195.9 379.4 188.5 384 Q 183.2 388.2 173.5 388 Q 163.1 385.9 158 378.5 Q 152.5 373.5 154 361.5 Q 155.9 352.4 162.5 348 L 170.5 344 Z M 173 358 L 170 359 L 168 363 L 169 371 L 175 374 L 181 373 L 184 369 L 184 363 L 182 359 Q 179 357 173 358 Z"
      />
    </svg>
  );
};

/**
 * Componente Pistons - Ícone de Sistema de Pistões
 *
 * @param {string} className - Classes CSS para estilização (opcional)
 * @param {number} width - Largura do ícone (padrão: 512)
 * @param {number} height - Altura do ícone (padrão: 512)
 * @param {object} props - Outras propriedades SVG
 */
export const Pistons = ({
  className = "",
  width = 512,
  height = 512,
  strokeColor = "currentColor",
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pistons Icon"
      role="img"
      {...props}
    >
      <title>Pistons</title>
      <desc>Engine pistons automotive icon</desc>

      {/* Pistão esquerdo */}
      <g>
        {/* Cilindro esquerdo */}
        <rect
          x="80"
          y="100"
          width="80"
          height="300"
          fill="rgb(60,60,60)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="8"
        />

        {/* Pistão esquerdo */}
        <rect
          x="85"
          y="180"
          width="70"
          height="40"
          fill="rgb(180,180,180)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="4"
        />

        {/* Biela esquerda */}
        <rect
          x="115"
          y="220"
          width="10"
          height="120"
          fill="rgb(100,100,100)"
          stroke={strokeColor}
          strokeWidth="20"
        />

        {/* Ponto de conexão esquerdo */}
        <circle
          cx="120"
          cy="340"
          r="15"
          fill="rgb(150,150,150)"
          stroke={strokeColor}
          strokeWidth="20"
        />

        {/* Anéis do pistão esquerdo */}
        <line
          x1="90"
          y1="185"
          x2="150"
          y2="185"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <line
          x1="90"
          y1="195"
          x2="150"
          y2="195"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <line
          x1="90"
          y1="205"
          x2="150"
          y2="205"
          stroke={strokeColor}
          strokeWidth="20"
        />
      </g>

      {/* Pistão central */}
      <g>
        {/* Cilindro central */}
        <rect
          x="216"
          y="80"
          width="80"
          height="320"
          fill="rgb(60,60,60)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="8"
        />

        {/* Pistão central */}
        <rect
          x="221"
          y="140"
          width="70"
          height="40"
          fill="rgb(180,180,180)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="4"
        />

        {/* Biela central */}
        <rect
          x="251"
          y="180"
          width="10"
          height="120"
          fill="rgb(100,100,100)"
          stroke={strokeColor}
          strokeWidth="20"
        />

        {/* Ponto de conexão central */}
        <circle
          cx="256"
          cy="300"
          r="15"
          fill="rgb(150,150,150)"
          stroke={strokeColor}
          strokeWidth="20"
        />

        {/* Anéis do pistão central */}
        <line
          x1="226"
          y1="145"
          x2="286"
          y2="145"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <line
          x1="226"
          y1="155"
          x2="286"
          y2="155"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <line
          x1="226"
          y1="165"
          x2="286"
          y2="165"
          stroke={strokeColor}
          strokeWidth="20"
        />
      </g>

      {/* Pistão direito */}
      <g>
        {/* Cilindro direito */}
        <rect
          x="352"
          y="100"
          width="80"
          height="300"
          fill="rgb(60,60,60)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="8"
        />

        {/* Pistão direito */}
        <rect
          x="357"
          y="200"
          width="70"
          height="40"
          fill="rgb(180,180,180)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="4"
        />

        {/* Biela direita */}
        <rect
          x="387"
          y="240"
          width="10"
          height="120"
          fill="rgb(100,100,100)"
          stroke={strokeColor}
          strokeWidth="20"
        />

        {/* Ponto de conexão direito */}
        <circle
          cx="392"
          cy="360"
          r="15"
          fill="rgb(150,150,150)"
          stroke={strokeColor}
          strokeWidth="20"
        />

        {/* Anéis do pistão direito */}
        <line
          x1="362"
          y1="205"
          x2="422"
          y2="205"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <line
          x1="362"
          y1="215"
          x2="422"
          y2="215"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <line
          x1="362"
          y1="225"
          x2="422"
          y2="225"
          stroke={strokeColor}
          strokeWidth="20"
        />
      </g>

      {/* Virabrequim */}
      <g>
        {/* Eixo principal */}
        <rect
          x="50"
          y="375"
          width="412"
          height="16"
          fill="rgb(80,80,80)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="8"
        />

        {/* Contrapesos */}
        <ellipse
          cx="120"
          cy="410"
          rx="25"
          ry="15"
          fill="rgb(100,100,100)"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <ellipse
          cx="256"
          cy="410"
          rx="25"
          ry="15"
          fill="rgb(100,100,100)"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <ellipse
          cx="392"
          cy="410"
          rx="25"
          ry="15"
          fill="rgb(100,100,100)"
          stroke={strokeColor}
          strokeWidth="20"
        />

        {/* Conectores do virabrequim */}
        <rect
          x="115"
          y="360"
          width="10"
          height="30"
          fill="rgb(90,90,90)"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <rect
          x="251"
          y="320"
          width="10"
          height="70"
          fill="rgb(90,90,90)"
          stroke={strokeColor}
          strokeWidth="20"
        />
        <rect
          x="387"
          y="380"
          width="10"
          height="10"
          fill="rgb(90,90,90)"
          stroke={strokeColor}
          strokeWidth="20"
        />
      </g>

      {/* Cabeçotes dos cilindros */}
      <g>
        {/* Cabeçote esquerdo */}
        <rect
          x="75"
          y="70"
          width="90"
          height="35"
          fill="rgb(120,120,120)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="6"
        />

        {/* Cabeçote central */}
        <rect
          x="211"
          y="50"
          width="90"
          height="35"
          fill="rgb(120,120,120)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="6"
        />

        {/* Cabeçote direito */}
        <rect
          x="347"
          y="70"
          width="90"
          height="35"
          fill="rgb(120,120,120)"
          stroke={strokeColor}
          strokeWidth="20"
          rx="6"
        />

        {/* Válvulas */}
        <circle cx="110" cy="87" r="4" fill="rgb(80,80,80)" />
        <circle cx="130" cy="87" r="4" fill="rgb(80,80,80)" />

        <circle cx="246" cy="67" r="4" fill="rgb(80,80,80)" />
        <circle cx="266" cy="67" r="4" fill="rgb(80,80,80)" />

        <circle cx="382" cy="87" r="4" fill="rgb(80,80,80)" />
        <circle cx="402" cy="87" r="4" fill="rgb(80,80,80)" />
      </g>

      {/* Detalhes de movimento */}
      <g opacity="0.6">
        {/* Indicadores de movimento */}
        <path
          d="M 100 160 Q 110 150 120 160"
          fill="none"
          stroke={strokeColor}
          strokeWidth="20"
          strokeDasharray="4,4"
        />
        <path
          d="M 236 120 Q 246 110 256 120"
          fill="none"
          stroke={strokeColor}
          strokeWidth="20"
          strokeDasharray="4,4"
        />
        <path
          d="M 372 180 Q 382 170 392 180"
          fill="none"
          stroke={strokeColor}
          strokeWidth="20"
          strokeDasharray="4,4"
        />
      </g>
    </svg>
  );
};

/**
 * Componente Transmissions - Ícone de Transmissão Automática
 *
 * @param {string} className - Classes CSS para estilização (opcional)
 * @param {number} width - Largura do ícone (padrão: 512)
 * @param {number} height - Altura do ícone (padrão: 512)
 * @param {object} props - Outras propriedades SVG
 */
export const Transmissions = ({
  className = "",
  width = 512,
  height = 512,
  strokeColor = "currentColor",
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Transmissions Icon"
      role="img"
      {...props}
    >
      <title>Transmissions</title>
      <desc>Created with imagetracer.js version 1.2.6</desc>

      {/* Fundo principal */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 130.5 9 L 145.5 9 L 160.5 13 Q 174.8 19.2 184 30.5 Q 192.2 40.2 196 54.5 L 197 59.5 L 197 76.5 Q 192.1 101.1 175.5 114 L 167 119 L 167 340.5 Q 167.3 341.8 173.5 341 L 183.5 344 L 192 351.5 L 197 362.5 L 197 377.5 L 198.5 379 Q 211.8 380.7 217 390.5 L 220 397.5 L 221 414.5 L 222.5 416 Q 234.2 417.3 239 425.5 Q 246.2 434.6 244 452 Q 256.9 453.9 263 463.5 L 267 472.5 L 267 498.5 L 264.5 502 L 262.5 503 L 13.5 503 L 9 498.5 L 9 473.5 Q 11.4 462.4 19.5 457 L 32 452 L 33 434.5 Q 35.5 426 41.5 421 Q 47.3 415.7 56 415 L 56 398.5 Q 58.8 388.3 66.5 383 L 79 377.5 Q 76.7 355.2 88.5 347 L 97.5 342 L 109 341 L 109 119.5 L 107.5 118 Q 98.8 113.8 93 106.5 Q 85.1 97.4 81 84.5 L 79 74.5 L 79 61.5 L 82 48.5 L 86 39.5 L 99.5 23 Q 111.3 12.3 130.5 9 Z"
      />

      {/* Primeira engrenagem (grande) */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 133 23 L 124 25 L 110 33 L 100 44 L 96 52 L 93 64 L 94 79 L 103 97 Q 113 109 133 113 L 150 112 L 166 104 Q 179 94 183 75 Q 185 51 174 41 Q 167 32 158 27 L 144 23 L 133 23 Z"
      />

      {/* Segunda engrenagem (média) */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 255.5 9 Q 278.8 8.2 287 22.5 L 292 33.5 L 292 47.5 Q 289.3 58.8 281.5 65 L 273.5 70 L 268 71 L 268 191 L 334.5 191 L 340 179.5 L 347.5 172 L 359 166.5 L 359 71.5 L 356.5 71 Q 346.6 67.9 341 60.5 Q 334.5 53 334 39.5 L 336 29.5 L 343 18 L 356.5 10 L 371.5 9 Q 383.1 11.9 390 19.5 Q 398 27.5 398 43.5 Q 395.3 58.3 385.5 66 L 376.5 71 L 373 71 L 373 166.5 L 374.5 168 Q 386.9 170.1 392 179.5 L 397 191 L 464 191 L 464 71 Q 453.7 69.7 448 62.5 Q 442.3 56.7 440 47.5 L 440 34.5 Q 443 21.5 452.5 15 Q 460.5 8 476.5 9 Q 489.4 11.6 496 20.5 Q 504.1 28.4 503 45.5 Q 499.9 59.9 489.5 67 L 478 72.5 L 478 323.5 L 479.5 325 Q 491.4 327.6 497 336.5 Q 504 344.5 503 360.5 Q 500.4 373.4 491.5 380 Q 483.6 388.1 466.5 387 Q 452.1 383.9 445 373.5 L 440 361.5 L 440 348.5 Q 442.7 338.9 448 333 L 456.5 327 L 464 325 L 464 205 L 397 205 Q 394.4 217.4 384.5 224 L 373 229.5 L 373 324.5 L 376.5 325 Q 385.5 328.5 391 335.5 Q 398.3 343.3 398 358.5 Q 395.8 371.8 387.5 379 L 375.5 386 L 361.5 387 L 356.5 386 L 343 378 L 336 366.5 L 334 353.5 Q 336.3 352.3 335 347.5 L 339 338.5 L 345.5 331 Q 350.5 325.6 359 325 L 359 229.5 L 357.5 228 Q 345.1 225.9 340 216.5 L 334.5 205 L 268 205 L 268 325 Q 279.1 326.5 285 334.5 Q 294.1 342.9 292 362.5 Q 288.3 375.3 278.5 382 L 265.5 387 L 255.5 387 Q 242.7 384.3 236 375.5 L 230 364.5 L 229 350.5 Q 231.9 336.9 241.5 330 L 254 323.5 L 254 72.5 L 252.5 71 Q 240.9 68.1 235 59.5 Q 228.2 51.8 229 36.5 Q 231.3 22.8 240.5 16 Q 246.2 10.7 255.5 9 Z"
      />

      {/* Engrenagem central detalhada */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 258 23 L 251 26 Q 245 30 243 38 Q 242 46 246 51 Q 249 56 257 58 Q 267 60 272 55 L 278 46 Q 280 33 274 29 Q 270 22 258 23 Z"
      />

      {/* Terceira engrenagem */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 363 23 L 355 27 L 350 33 L 348 40 L 349 47 L 351 51 Q 355 56 362 58 Q 371 59 376 56 Q 382 52 384 43 Q 384 34 380 30 Q 375 22 363 23 Z"
      />

      {/* Quarta engrenagem */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 468 23 L 463 25 L 454 36 Q 452 47 457 52 L 467 58 Q 476 60 481 56 Q 487 52 489 45 Q 490 35 486 31 Q 481 22 468 23 Z"
      />

      {/* Haste da primeira engrenagem */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 123 125 L 123 341 L 153 341 L 153 341 L 153 125 L 146 127 Q 131 129 123 125 Z"
      />

      {/* Engrenagem intermediária */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 365 180 L 357 183 Q 350 187 348 197 Q 348 203 351 208 Q 355 214 365 216 Q 371 216 376 213 Q 382 209 384 200 Q 384 193 381 189 Q 376 181 365 180 Z"
      />

      {/* Engrenagens inferiores */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 257 338 L 252 340 Q 245 344 243 353 Q 242 361 246 366 Q 250 371 258 373 L 265 373 L 274 368 L 278 361 Q 280 349 275 345 L 266 338 L 257 338 Z"
      />

      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 362 338 L 356 341 L 351 346 L 348 355 Q 348 362 352 367 L 363 373 Q 372 374 377 370 Q 382 366 384 358 Q 384 350 381 346 Q 376 337 362 338 Z"
      />

      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 467 338 L 461 341 L 454 351 Q 452 360 456 365 Q 460 371 468 373 Q 477 374 482 370 Q 487 366 489 359 Q 490 351 487 347 L 477 338 L 467 338 Z"
      />

      {/* Base/caixa da transmissão */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 105 355 L 99 357 Q 94 360 93 366 L 93 378 L 94 378 L 183 378 L 183 365 L 182 362 Q 179 357 173 355 L 105 355 Z"
      />

      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 80 392 L 76 394 L 70 401 L 70 415 L 71 415 L 207 415 Q 209 403 204 397 L 197 392 L 80 392 Z"
      />

      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 57 429 L 52 431 Q 47 434 46 441 L 46 452 L 47 452 L 230 452 L 230 439 L 228 435 L 221 429 L 57 429 Z"
      />

      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.984313725490196"
        d="M 33 466 L 29 468 L 23 476 L 23 489 L 24 489 L 253 489 L 253 475 L 250 469 L 244 466 L 33 466 Z"
      />
    </svg>
  );
};

/**
 * Componente ManualTransmissions - Ícone de Transmissão Manual
 *
 * @param {string} className - Classes CSS para estilização (opcional)
 * @param {number} width - Largura do ícone (padrão: 512)
 * @param {number} height - Altura do ícone (padrão: 512)
 * @param {object} props - Outras propriedades SVG
 */
export const ManualTransmissions = ({
  className = "",
  width = 512,
  height = 512,
  strokeColor = "currentColor",
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Manual Transmissions Icon"
      role="img"
      {...props}
    >
      <title>Manual Transmissions</title>
      <desc>Created with imagetracer.js version 1.2.6</desc>

      {/* Primeira seção da transmissão */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 23.5 0 L 54.5 0 L 63 5.5 L 66 10.5 L 66 104.5 L 63 111 L 55.5 115 L 46.5 115 L 38 109.5 L 35 101.5 L 35 31 L 24.5 31 L 16 27 L 12 18.5 L 12 12.5 L 17.5 3 L 23.5 0 Z"
      />

      {/* Segunda seção - engrenagem principal */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 220.5 0 L 272.5 0 Q 288.1 2.9 296 13.5 Q 304.8 22.7 304 41.5 Q 302.4 51.4 297 57.5 L 303 68.5 L 304 83.5 Q 300.8 99.8 289.5 108 Q 283.1 113.1 273.5 115 L 220.5 115 L 212 109.5 Q 208.1 105.4 209 96.5 L 214.5 87 L 220.5 84 L 269.5 84 L 273 80.5 Q 274 74 269.5 73 L 237.5 73 Q 231.8 71.8 229 67.5 Q 224.7 63.3 226 53.5 L 232.5 44 L 237.5 42 L 269.5 42 L 273 38.5 Q 274 32 269.5 31 L 220.5 31 L 212 25.5 Q 208.1 21.4 209 12.5 L 214.5 3 L 220.5 0 Z"
      />

      {/* Terceira seção - lado direito */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 435.5 0 L 493.5 0 Q 500 1.5 503 6.5 Q 506.7 10.8 505 20.5 L 498.5 29 L 493.5 31 L 452 31 L 451 42 L 474.5 42 L 479.5 43 Q 492.3 46.7 499 56.5 L 505 71.5 L 505 85.5 Q 501.8 101.3 490.5 109 L 485.5 112 L 474.5 115 L 430.5 115 Q 423.3 113.2 420 107.5 L 418 98.5 L 420 91.5 L 425.5 86 L 430.5 84 L 471.5 84 L 474 81.5 L 475 78.5 L 472.5 74 L 470.5 73 L 430.5 73 Q 424 71.5 421 66.5 Q 417.5 63 418 55.5 L 419 54.5 L 419 46.5 L 421 37.5 L 423 13.5 Q 424.4 5.4 430.5 2 L 435.5 0 Z"
      />

      {/* Corpo principal da transmissão */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 46.5 139 Q 59.8 137.8 64 145.5 L 66 150.5 L 66 240 L 196.5 240 L 197 237.5 Q 203.7 218.2 218.5 207 Q 227.4 199.4 240 197 L 240 154.5 Q 242.3 153.3 241 148.5 L 245.5 142 Q 250 137.5 260.5 139 L 270 146.5 L 271 149.5 L 271 195.5 L 272.5 197 Q 293.7 202.8 305 218.5 Q 312.6 227.4 315 240 L 446 240 L 446 150.5 Q 447.5 144 452.5 141 Q 456.9 137.9 465.5 139 Q 472 140.5 475 145.5 L 477 150.5 L 477 361.5 L 471.5 370 Q 467.3 374.3 457.5 373 L 448 366.5 L 446 361.5 L 446 271 L 316.5 271 L 315 272.5 Q 309.3 292.8 294.5 304 L 287.5 309 L 271 316.5 L 271 362.5 Q 269.6 368.6 264.5 371 Q 260.5 374 252.5 373 Q 245.3 371.2 242 365.5 L 240 357.5 L 240 315 Q 219.4 309.9 208 294.5 L 203 287.5 L 195.5 271 L 66 271 L 66 360.5 Q 65.1 367.1 60.5 370 Q 56.1 374 46.5 373 L 37 366.5 L 35 361.5 L 35 150.5 Q 36.5 144 41.5 141 L 46.5 139 Z"
      />

      {/* Engrenagem central detalhada */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 249 226 Q 240 228 235 234 Q 229 240 226 249 Q 224 265 230 273 Q 237 282 250 286 L 263 286 L 274 281 Q 283 275 286 263 L 286 250 L 281 239 Q 276 231 267 227 L 264 226 L 249 226 Z"
      />

      {/* Seção inferior esquerda */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 15.5 389 L 67.5 389 Q 83.5 391.5 91 402.5 Q 96.1 408.9 98 418.5 L 98 431.5 Q 95.1 447.6 83.5 455 L 72.5 460 L 50.5 464 L 41 470.5 L 40 472.5 L 85.5 473 Q 92.1 473.9 95 478.5 Q 99.3 482.7 98 492.5 Q 96.5 499 91.5 502 L 86.5 504 L 15.5 504 L 7 498.5 L 4 492.5 L 3 480.5 L 8 464.5 L 20.5 449 Q 29.5 441 41.5 436 L 56.5 431 L 64.5 430 L 67 427.5 Q 68.3 421.3 64.5 420 L 15.5 420 Q 8.3 418.2 5 412.5 Q 2.8 407.7 4 399.5 L 10.5 391 L 15.5 389 Z"
      />

      {/* Alavanca de câmbio */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 215.5 392 Q 228.1 391.4 232 399.5 L 234 405.5 L 234 437 L 254 437 L 254 402.5 L 259.5 395 Q 263.6 391.1 272.5 392 Q 279.7 393.8 283 399.5 L 285 405.5 L 285 437 L 299.5 438 L 307 444.5 Q 310 448.5 309 456.5 Q 307.5 463 302.5 466 L 298.5 468 L 285 468 L 285 493.5 Q 283.6 501.6 277.5 505 L 271.5 507 L 266.5 507 Q 259.6 505.5 256 500.5 L 254 495.5 L 254 468 L 213.5 468 L 205 461.5 L 203 457.5 L 203 402.5 L 208.5 395 L 215.5 392 Z"
      />

      {/* Seção direita inferior */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 427.5 394 L 473.5 394 Q 490.2 397.3 499 408.5 L 507 423.5 Q 509.7 431.8 508 444.5 Q 504.6 459.1 494.5 467 L 491 469.5 L 492 472.5 L 508 490.5 L 509 498.5 L 503.5 508 Q 499.5 513 489.5 512 L 480 505.5 L 454.5 477 L 446 477 L 446 500.5 Q 444.8 506.3 440.5 509 Q 436.2 512.2 428.5 512 Q 420.4 510.6 417 504.5 L 415 498.5 L 415 407.5 Q 416.9 399.9 422.5 396 L 427.5 394 Z"
      />

      {/* Detalhe lateral direito */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        opacity="0.9882352941176471"
        d="M 446 425 L 446 446 L 471 446 L 473 445 L 477 440 Q 478 433 476 430 L 471 425 L 446 425 Z"
      />
    </svg>
  );
};

/**
 * Componente MotorizationEngine - Ícone de Motorização/Powertrain
 *
 * @param {string} className - Classes CSS para estilização (opcional)
 * @param {number} width - Largura do ícone (padrão: 512)
 * @param {number} height - Altura do ícone (padrão: 512)
 * @param {object} props - Outras propriedades SVG
 */

export const MotorizationEngine = ({
  className = "",
  width = 512,
  height = 512,
  strokeColor = "currentColor",
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Motorization Engine Icon"
      role="img"
      {...props}
    >
      <title>Motorization Engine</title>
      <desc>Outlined version, transparent background</desc>

      {/* Estrutura principal do motor */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 188.5 99 L 284.5 99 Q 295.5 101 301 108.5 L 306 119.5 L 306 141.5 L 302.5 146 L 300.5 147 L 257 147 L 257 165 L 307.5 165 L 316.5 168 L 330 181.5 L 351.5 205 L 406.5 205 Q 414.9 207.2 419 213.5 L 422 220.5 L 422 240.5 L 424.5 244 L 426.5 245 L 438.5 245 L 442 242.5 L 444 229.5 L 449.5 222 Q 454.5 216.5 466.5 218 L 475.5 223 L 499 245.5 L 501 248.5 L 503 257.5 L 503 330.5 Q 500.5 332 502 337.5 L 500 341.5 L 483.5 358 L 470.5 369 L 464.5 371 L 459.5 371 Q 450.4 369.1 446 362.5 L 443 356.5 L 442 346.5 L 439.5 344 L 425.5 344 L 422 347.5 L 422 397.5 Q 419.9 404.9 414.5 409 L 405.5 413 L 178.5 413 Q 170.2 411.3 166 405.5 L 149.5 378 L 100.5 378 Q 99.2 375.8 94.5 377 L 86 371.5 L 81 362.5 L 81 307 L 61 307 L 61 353.5 L 60 357.5 L 57.5 360 L 55.5 361 L 31.5 361 Q 21.8 358.7 16 352.5 L 11 344.5 L 9 334.5 L 9 235.5 L 12 223.5 L 20.5 214 L 28.5 210 L 53.5 209 L 60 213.5 L 61 216.5 L 61 263 L 81 263 L 81 208.5 Q 83.2 200.2 89.5 196 L 96.5 193 L 125.5 193 L 129 189.5 L 136 174.5 L 142.5 168 L 152.5 165 L 216 165 L 216 147 L 173.5 147 L 169 145 L 168 142.5 L 168 117.5 L 174 106 L 181.5 101 L 188.5 99 Z"
      />

      {/* Cabeçote do motor */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 190 112 L 185 114 L 181 119 L 181 134 L 182 134 L 293 134 L 293 121 L 291 117 L 285 112 L 190 112 Z"
      />

      {/* Componente central */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 229 147 L 229 165 L 244 165 L 244 147 L 229 147 Z"
      />

      {/* Estrutura complexa */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 150 179 L 146 183 L 140 197 Q 136 204 127 206 L 98 206 L 94 210 L 94 361 L 95 363 L 98 364 L 146 364 Q 147 366 152 365 L 158 368 L 163 375 L 175 397 L 180 400 L 405 400 L 407 399 L 409 396 L 409 347 L 412 340 Q 416 334 424 331 L 442 331 L 448 334 Q 457 339 456 355 L 461 358 L 466 357 L 474 350 L 489 335 L 489 254 L 465 231 Q 459 230 457 232 L 455 245 L 452 251 Q 448 256 440 258 Q 424 261 417 254 Q 411 250 409 242 L 409 222 L 406 218 L 351 218 L 344 215 L 322 192 L 310 179 L 150 179 Z"
      />

      {/* Sistema de ignição */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 224.5 207 L 277.5 207 L 282 210.5 L 283 214.5 L 269 256 L 312.5 255 L 317 259.5 L 317 263.5 L 233.5 370 L 228.5 371 L 224 367.5 L 223 364.5 L 243 303 L 200.5 303 L 197 300.5 L 196 293.5 L 214 231.5 L 218 213.5 L 221.5 208 L 224.5 207 Z"
      />

      {/* Detalhes da faísca */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 230 220 L 211 290 L 254 290 L 256 291 L 258 295 L 258 300 L 248 329 L 249 330 L 292 276 L 296 268 L 291 269 L 263 269 L 262 270 L 256 268 L 253 264 L 267 223 L 267 220 L 230 220 Z"
      />

      {/* Base lateral */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 31 223 L 29 224 L 23 231 L 23 341 L 25 344 L 33 348 L 48 348 L 48 224 L 48 223 L 31 223 Z"
      />

      {/* Componente auxiliar */}
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        d="M 61 276 L 61 294 L 81 294 L 81 276 L 61 276 Z"
      />
    </svg>
  );
};
