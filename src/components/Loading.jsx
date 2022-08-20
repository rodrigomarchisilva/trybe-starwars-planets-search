import React from 'react';
import { Placeholder, Row, Col } from 'react-bootstrap';

export default function Loading() {
  const ROWS = 13;
  const COLS = 3;

  Col.defaultProps = { xs: 4 };

  return (
    <div>
      {
        Array.from({ length: ROWS }).map((_, i) => (
          <Row className="ms-1 mb-2 me-1" key={ i }>
            {
              Array.from({ length: COLS }).map((_2, j) => (
                <Placeholder as={ Col } className="ps-1 pe-1" key={ j } animation="glow">
                  <Placeholder size="lg" className="rounded-1 p-3 w-100" />
                </Placeholder>
              ))
            }
          </Row>
        ))
      }
    </div>
  );
}
